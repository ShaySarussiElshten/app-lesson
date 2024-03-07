const csv = require('@fast-csv/parse');

// Ensure CSV data is correctly formatted and trimmed
const csvData = `
id,paper_id,symbol,region_id,paper_name_he,paper_name_en,paper_name_alt,paper_type_id,paper_sub_type_id,paper_type_he,paper_type_en,exchange_he,exchange_en,country_id,country_name_he,country_name_en,long_paper_name_he,long_paper_name_en,paper_type_order_he,paper_type_order_en,group_paper_type_id,group_paper_type_name_he,group_paper_type_name_en,tags,date_change
--,--------,------,---------,-------------,-------------,--------------,-------------,-----------------,-------------,-------------,-----------,-----------,----------,---------------,---------------,------------------,------------------,-------------------,-------------------,-------------------,------------------------,------------------------,----,-----------
1,1080456,RIMO,0,רימוני,RIMONI,NULL,1,1,מניה,Shares,תל אביב,TASE,1,ישראל,Israel,רימוני,RIMONI,1,1,1,מניה,Shares,NULL,2024-03-05 07:06:56.687
2,103010,TTAM,0,טיב טעם,TIV TAAM,NULL,1,1,מניה,Shares,תל אביב,TASE,1,ישראל,Israel,טיב טעם,TIV TAAM,1,1,1,מניה,Shares,NULL,2024-03-05 07:06:56.687
3,106013,CNGL,0,קנדה גלובל,CANADA GLOBAL,NULL,1,1,מניה,Shares,תל אביב,TASE,1,ישראל,Israel,קנדה גלובל,CANADA GLOBAL,1,1,1,מניה,Shares,NULL,2024-03-05 07:06:56.687
4,111013,CSURE-M,0,קנאשור,CANNASSURE-M,NULL,1,1,מניה,Shares,תל אביב,TASE,1,ישראל,Israel,קנאשור,CANNASSURE-M,1,1,1,מניה,Shares,NULL,2024-03-05 07:06:56.687
`.trim();

function isValidData(data) {
    return !Object.values(data).some(value => /^-+$/.test(value));
}

function cleanData(data) {
    Object.keys(data).forEach(key => {
        if (/^-+$/.test(data[key])) {
            data[key] = null; // Adjust as needed
        }
    });
}

csv.parseString(csvData, { headers: true })
    .on("data", function(data) {
        if (isValidData(data)) {
            cleanData(data);
            console.log(data); // Log the cleaned data
        }
    })
    .on("end", function() {
        console.log('CSV processing finished.');
    })
    .on("error", function(error) {
        console.error('Error processing CSV:', error);
    });
