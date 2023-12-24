const cron = require('node-cron');
const axios = require('axios');
const Cases = require('../models/caseModel')
const moment = require("moment");
const momentTz = require("moment-timezone");
const sendTelegramMessage = async (text) => {
    console.log("🚀  file: cron_sendCase.js:7  text:", text)
    try {
        await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: `${process.env.TELEGRAM_CHATID_GROUB}`,
            text: text,
        });
    } catch (error) {
        console.error('Error sending message:', error.message);
    }
};

const generateSummaryMessage = (data, currentTime1) => {
    
    const timeStamp = currentTime1.locale('th').format('lll')
    const isMorning = currentTime1.isBetween(moment('09:35', 'HH:mm'), moment('20:35', 'HH:mm'));
    const timeOfDay = isMorning ? '(กะเช้า 🌞)' : '(กะดึก 🌛)';

    // ลบวันที่ 1 วัน ถ้าเป็นกะดึก
    if (!isMorning) {
        currentTime1.subtract(1, 'day');
    }

    const formattedDate = currentTime1.locale('th').format('ll');
   const formattedTime = momentTz().tz('Asia/Bangkok').format('HH:mm');
    console.log("🚀  file: cron_sendCase.js:31  formattedTime:", formattedTime)
   
    

    let msg = "";
    if (data.length === 0) {
        msg = ` สรุปการทำงานประจำวันที่ ${formattedDate} เวลา ${formattedTime} น. ${timeOfDay} \n\n`;
        msg += "- ไม่มีรายการค้าง";
    } else {
        msg = ` สรุปการทำงานประจำวันที่ ${formattedDate}  ${timeOfDay}\n\n`;
        msg += `เคสค้างจำนวน ${data.length} รายการ\n\n`;

        data.forEach((item, index) => {
            msg += `${index + 1}. ${item.caseId} - ${item.status}\n`;
        });
    }

    return msg;
};

const resultTotal = async () => {
    const caseAwait = await Cases.find();
    const data = caseAwait.filter((item) => { return item.status === "รอการแก้ไข" });

    
    const msg = generateSummaryMessage(data, moment());
    console.log("🚀  file: cron_sendCase.js:53  msg:", msg)

    await sendTelegramMessage(msg);
}
const cronSendCaseMorning = new cron.schedule('* * * * *', () => {
    resultTotal()
    console.log('cronSendCaseMorning start...');
}, {
    scheduled: true,
    timezone: 'Asia/Bangkok' // ระบุ Timezone ที่ถูกต้อง
});

const cronSendCaseEvening = new cron.schedule('30 8 * * *', async () => {
    resultTotal()
    console.log('cronSendCaseEvening start...');
}, {
    scheduled: true,
    timezone: 'Asia/Bangkok' // ระบุ Timezone ที่ถูกต้อง
});



module.exports = { cronSendCaseMorning, cronSendCaseEvening };
