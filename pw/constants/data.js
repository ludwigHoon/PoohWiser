const currency = 'MYR';
const transaction = [
    {
        'description':'XXX petrol station',
        'completed': '',
        'value':100,
        'new_balance': 300,
        'currency': 'MYR',
        },
        {
          'description':'ABC groceries',
          'completed': '',
          'value':180,
          'new_balance': 300,
          'currency': 'MYR',
        },
        {
          'description':'XX Telecommunications',
          'completed': '',
          'value':50,
          'new_balance': 300,
          'currency': currency,
        },
        {
          'description':'Carrier delivery',
          'completed': '',
          'value':10,
          'new_balance': 300,
          'currency': currency,
        },
        {
          'description':'XXX rental',
          'completed': '',
          'value':500,
          'new_balance': 300,
          'currency': currency,
        },
        {
          'description':'Online shopping',
          'completed': '',
          'value':180,
          'new_balance': 300,
          'currency': 'MYR',
        },
        {
          'description':'XYZ dine',
          'completed': '',
          'value':50,
          'new_balance': 300,
          'currency': currency,
        },
        {
          'description':'Barber shop',
          'completed': '',
          'value':10,
          'new_balance': 300,
          'currency': currency,
        },
        {
          'description':'AAA travel',
          'completed': '',
          'value':500,
          'new_balance': 300,
          'currency': currency,
        },
        {
          'description':'Gym membership',
          'completed': '',
          'value':80,
          'new_balance': 300,
          'currency': currency,
        }
];

const account = [];
const balance = [
    {
        'amount': 50,
        'currency': currency,
    },
    {
        'amount': 50,
        'currency': currency,
    },
    {
        'amount': 50,
        'currency': currency,
    },
    {
        'amount': 50,
        'currency': currency,
    },
];

const data = [
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYaTPekcM7KdqqYb8REROPXQC13nwdmx-JSzHWAMDcaU3reVEi", //Green / Yellow / Red
      title: "Financial health",
      value: "Good" //Available value: "Good", "Okay", "Bad"
    },
    {
      imageUrl: "https://cdn.wellkeptwallet.com/wp-content/uploads/20181126175820/Recommended-Budget-Percentages-final.png", //Pie chart
      title: "Spending this month",
      value : 1000 // Replace with calculation from current month
    },
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlcl5sGJa9KYF6J9zKBRO7kGpDLjC1nN0bUlozxoYpwM-huPZOA", //stacked chart
      title: "Current balance",
      value: 0 // Replace with current balance
    },
    {
      imageUrl: "https://mascdn.azureedge.net/frontend/a/budget_planner/how-to-use_step-2-dfa3bc470d97e209577cb73bbca7ae9d.png", // Image
      title: "Monthly bills",
      value: 3000 //Replace with value from database
    },
    {
      imageUrl: "https://www.google.com/search?rlz=1C1GCEA_enMY831MY831&biw=767&bih=708&tbm=isch&sa=1&ei=XLD_XMWqI5DEvwTjx62oCA&q=multiple+days+countdown+timer+png&oq=multiple+days+countdown+timer+png&gs_l=img.3...26196.27998..28144...0.0..0.116.1324.4j9......0....1..gws-wiz-img.JBSEse9wY9s#imgdii=gf3ZaW8rFYIjPM:&imgrc=PsIF5iEP6EvzYM:", //Image
      title: "Days to tax filing",
      value: 132 //Replace with value from database
    },
    {
      imageUrl: "https://www.google.com/search?q=stacked+bar+chart+multiple+png&tbm=isch&tbs=rimg:CYQVAajbdMzoIjhDyt27aflGXiHD90NvU1dehxBTqrZwa7TySMsvByPIAcweXCfSAda6VvzfTB4bxsOlAEo0jrZFcSoSCUPK3btp-UZeEdzDSt1sXYBnKhIJIcP3Q29TV14RaW2LK-86ZQEqEgmHEFOqtnBrtBGFdSIHC5qgtioSCfJIyy8HI8gBEWap95HnhnHQKhIJzB5cJ9IB1roRFDyfHjYos8UqEglW_1N9MHhvGwxGhxhVlQ1Hr5ioSCaUASjSOtkVxEVTLHMqpiNVw&tbo=u&sa=X&ved=2ahUKEwiunJydyuHiAhUBTY8KHfYEAp8Q9C96BAgBEBg&biw=767&bih=708&dpr=1.25#imgdii=YlSeU_OaWAVWmM:&imgrc=rV8CV9c3x22-UM:", // Image
      title: "Average monthly spending",
      value: 1000, //Replace with value from database
    }
    ,
    {
      imageUrl: "https://www.monkeybreadsoftware.de/xojo/chartdirector/images/multiline2b_g.png", //Line chart
      title: "Saving/Investment",
      value: 500, //Replace with value from database
    }
  ];

const transaction2 = [
    {
        'description':'XXX petrol station',
        'completed': '',
        'value':100,
        'new_balance': 300,
        'currency': 'MYR',
        },
        {
          'description':'ABC groceries',
          'completed': '',
          'value':180,
          'new_balance': 300,
          'currency': 'MYR',
        },
        {
          'description':'XX Telecommunications',
          'completed': '',
          'value':50,
          'new_balance': 300,
          'currency': currency,
        },
        {
          'description':'Carrier delivery',
          'completed': '',
          'value':10,
          'new_balance': 300,
          'currency': currency,
        },
        {
          'description':'XXX rental',
          'completed': '',
          'value':500,
          'new_balance': 300,
          'currency': currency,
        },
        {
          'description':'Gym membership',
          'completed': '',
          'value':80,
          'new_balance': 300,
          'currency': currency,
        }
];

const account2 = [];
const balance2 = [
    {
        'amount': 50,
        'currency': currency,
    },
    {
        'amount': 50,
        'currency': currency,
    },
    {
        'amount': 51,
        'currency': currency,
    },
    {
        'amount': 50,
        'currency': currency,
    },
];

const data2 = [
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYaTPekcM7KdqqYb8REROPXQC13nwdmx-JSzHWAMDcaU3reVEi", //Green / Yellow / Red
      title: "Financial health",
      value: "Good" //Available value: "Good", "Okay", "Bad"
    },
    {
      imageUrl: "https://cdn.wellkeptwallet.com/wp-content/uploads/20181126175820/Recommended-Budget-Percentages-final.png", //Pie chart
      title: "Spending this month",
      value : 1000 // Replace with calculation from current month
    },
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlcl5sGJa9KYF6J9zKBRO7kGpDLjC1nN0bUlozxoYpwM-huPZOA", //stacked chart
      title: "Current balance",
      value: 0 // Replace with current balance
    },
    {
      imageUrl: "https://mascdn.azureedge.net/frontend/a/budget_planner/how-to-use_step-2-dfa3bc470d97e209577cb73bbca7ae9d.png", // Image
      title: "Monthly bills",
      value: 3000 //Replace with value from database
    },
    {
      imageUrl: "https://www.google.com/search?rlz=1C1GCEA_enMY831MY831&biw=767&bih=708&tbm=isch&sa=1&ei=XLD_XMWqI5DEvwTjx62oCA&q=multiple+days+countdown+timer+png&oq=multiple+days+countdown+timer+png&gs_l=img.3...26196.27998..28144...0.0..0.116.1324.4j9......0....1..gws-wiz-img.JBSEse9wY9s#imgdii=gf3ZaW8rFYIjPM:&imgrc=PsIF5iEP6EvzYM:", //Image
      title: "Days to tax filing",
      value: 132 //Replace with value from database
    },
    {
      imageUrl: "https://www.google.com/search?q=stacked+bar+chart+multiple+png&tbm=isch&tbs=rimg:CYQVAajbdMzoIjhDyt27aflGXiHD90NvU1dehxBTqrZwa7TySMsvByPIAcweXCfSAda6VvzfTB4bxsOlAEo0jrZFcSoSCUPK3btp-UZeEdzDSt1sXYBnKhIJIcP3Q29TV14RaW2LK-86ZQEqEgmHEFOqtnBrtBGFdSIHC5qgtioSCfJIyy8HI8gBEWap95HnhnHQKhIJzB5cJ9IB1roRFDyfHjYos8UqEglW_1N9MHhvGwxGhxhVlQ1Hr5ioSCaUASjSOtkVxEVTLHMqpiNVw&tbo=u&sa=X&ved=2ahUKEwiunJydyuHiAhUBTY8KHfYEAp8Q9C96BAgBEBg&biw=767&bih=708&dpr=1.25#imgdii=YlSeU_OaWAVWmM:&imgrc=rV8CV9c3x22-UM:", // Image
      title: "Average monthly spending",
      value: 1000, //Replace with value from database
    }
    ,
    {
      imageUrl: "https://www.monkeybreadsoftware.de/xojo/chartdirector/images/multiline2b_g.png", //Line chart
      title: "Saving/Investment",
      value: 500, //Replace with value from database
    }
  ];

export const fdata1 = {
    account:account,
    transaction:transaction,
    balance:balance,
    data: data,
}

export const fdata2 ={
    account: account2,
    transaction: transaction2, 
    balance: balance2,
    data: data2, 
}
