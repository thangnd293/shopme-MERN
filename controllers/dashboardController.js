const catchAsync = require('./../utils/catchAsync');

const Bill = require('./../models/bill');
const User = require('./../models/user');

exports.getData = catchAsync(async (req,resp,next)=>{
    const sale = await getSale();
    console.log(sale);
    // Trả về
    const chartSale = await getChartSale();
    console.log(chartSale);
    resp.send(200);
});

const getSale = async function() {
    const date = new Date();
    const firstDayOfCurrMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfCurrMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    date.setMonth(date.getMonth() - 1);

    const prevMonth = date.toLocaleString('default', { month: 'long' });

    const firstDayOfPrevMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfPrevMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const filterCurrMonth = {
        createAt: {
            $gt: firstDayOfCurrMonth,
            $lte: lastDayOfCurrMonth
        }
    }

    const currSale = await Bill.aggregate([
        {
            $match: filterCurrMonth
        },
        {
            $group: {
                _id: null,
                total: { $sum: '$amount' },
                count: { $sum: '$quantity'}
            }
        }
    ]);

    const filterPrevMonth = {
        createAt: {
            $gt: firstDayOfPrevMonth,
            $lte: lastDayOfPrevMonth
        }
    }

    const prevSale = await Bill.aggregate([
        {
            $match: filterPrevMonth
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" },
                count: { $sum: '$quantity'}
            }
        }
    ]);
    const totalCurrentSale = currSale[0]?.total || 0;
    const totalPreviousSale = prevSale[0]?.total || 0;
    const countCurrentSale = currSale[0]?.count || 0;
    const countPreviousSale = prevSale[0]?.count || 0;

    const totalGrowthRate = ((totalCurrentSale / totalPreviousSale * 100) - 100).toFixed(2);
    const countGrowthRate = ((countCurrentSale / countPreviousSale * 100) - 100).toFixed(2);

    const currMonthNewUser = await User.aggregate([
        {
            $match: filterCurrMonth
        },
        {
            $group: {
                _id: null,
                count: { $sum: 1}
            }
        }
    ])

    const prevMonthNewUser = await User.aggregate([
        {
            $match: filterPrevMonth
        },
        {
            $group: {
                _id: null,
                count: { $sum: 1}
            }
        }
    ])

    const newUserCurrentMonth = currMonthNewUser[0]?.count || 0;
    const newUserPreviousMonth = prevMonthNewUser[0]?.count || 0;
    const newUserGrowthRate = ((newUserCurrentMonth / newUserPreviousMonth * 100) - 100).toFixed(2);

    const sale = {
        total: totalCurrentSale,
        totalGrowthRate,
        prevMonth
    }

    const sold = {
        count: countCurrentSale,
        countGrowthRate,
        prevMonth
    }

    const user = {
        newUser: newUserCurrentMonth,
        newUserGrowthRate,
        prevMonth
    }

    return { sale, sold , user};
}

const getChartSale = async function() {
    const date = new Date();
    const firstDayOfCurrMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfCurrMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const currMonth = date.toLocaleString('default', { month: 'long' });


    const filterCurrMonth = {
        createAt: {
            $gt: firstDayOfCurrMonth,
            $lte: lastDayOfCurrMonth
        }
    }
    const groupBy = { date: { $dayOfMonth: '$createAt' } }
    const sale = await Bill.aggregate([
        {
            $match: filterCurrMonth
        },
        {
            $group: {
                _id: groupBy,
                total: { $sum: '$amount' }
            }
        }
    ])

    const dayInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const values = Array(dayInMonth).fill(0);

    for (const s of sale) {
        values[s._id.date - 1] = s.total;
    }
    const categories = [];
    for(let i = 1;i <= dayInMonth; i++) {
        categories.push(`${i} ${currMonth}`);
    }


    return {
        categories,
        values
    }
}