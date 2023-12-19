// ในไฟล์ UpdatesFunctions.js
import axios from 'axios';

import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const sendReplyMessage = async (chatid, message_id) => {


  await axios.post(`https://api.telegram.org/bot6447136137:AAH--dlGcGoJfU7q4bwaRzRKYVuln2mmoNs/sendMessage`, {
    chat_id: chatid,
    text: "BOT : ขอบคุณครับ",
    reply_to_message_id: message_id,
  });
}

const getUpdatesChat = async (offset, lastUpdateId, setOffset, setLastUpdateId, socket) => {
  try {
    const base_url = "https://api.telegram.org/bot6447136137:AAH--dlGcGoJfU7q4bwaRzRKYVuln2mmoNs/getUpdates";

    const response = await axios.get(base_url, {
      params: { offset: offset }
    });
    const result = response.data;

    if (result.ok) {
      const updates = result.result;

      updates.forEach(update => {
        
        const message = update.message;
        const chatId = message.chat.id;
        const messageId = message.message_id;
        const updateId = update.update_id;

       
        if (updateId > lastUpdateId) {
          setLastUpdateId(updateId);
        }

        if (message.text.includes('แก้ไขรายการ')) {
          // ใช้ import เพื่อให้โค้ดนี้รู้จัก sendReplyMessage ที่อยู่ในไฟล์อื่น
          sendReplyMessage(chatId, messageId);

        } else {

        }
      });

      // อัปเดต offset โดยใช้ update_id ของข้อมูลล่าสุด
      if (updates.length > 0) {
        const latestUpdateId = updates[updates.length - 1].update_id;
        setOffset(latestUpdateId + 1);
        socket.emit('telegramUpdate', { updates });
      }
    }
  } catch (error) {
    // console.error('Error fetching updates:', error.response.data.description);
  }
}

export { sendReplyMessage, getUpdatesChat };
