const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    // ==========================================
    // 1. MẪU RULES (QUY ĐỊNH) - HIỂN THỊ CHIA CỘT
    // ==========================================
    rules: {
        embeds: [
            new EmbedBuilder()
                // 👉 THAY MÃ MÀU HEX (Màu dải bên trái)
                .setColor('#2b2d31') 
                
                // 👉 THAY TIÊU ĐỀ
                .setTitle('📜 QUY ĐỊNH & NGUYÊN TẮC XỬ LÝ') 
                
                // 👉 THAY LINK ẢNH BANNER (Hình to đùng ở trên cùng)
                .setImage('https://i.imgur.com/your-banner-url.png') 
                
                // 👉 THAY LỜI MỞ ĐẦU
                .setDescription('Tham gia máy chủ đồng nghĩa với việc bạn đồng ý tuân thủ toàn bộ quy định.\nMọi hành vi vi phạm sẽ được xử lý dựa trên mức độ nghiêm trọng.')
                
                // 👉 THAY CÁC MỤC LUẬT Ở ĐÂY (inline: true giúp chia cột giống trong ảnh)
                .addFields(
                    { name: '🔹 1. Ứng xử', value: '• Tôn trọng tất cả thành viên.\n• Không chửi bậy, xúc phạm.\n• Không gây war, toxic.', inline: true },
                    { name: '🔹 2. Spam & Quảng cáo', value: '• Không spam tin nhắn, emoji.\n• Không quảng cáo server khác.\n• Không DM lôi kéo hàng loạt.', inline: true },
                    { name: '🔹 3. Voice Chat', value: '• Không spam mic, ồn ào.\n• Không lạm dụng soundboard.\n• Tôn trọng người đang nói.', inline: true },
                    { name: '🔹 4. Hack & Gian lận', value: '• Cấm hack, cheat, third-party.\n• Cấm lợi dụng bug.\n**👉 Vi phạm = Ban vĩnh viễn**', inline: true },
                    { name: '🔹 5. Nội dung & Chủ đề', value: '• Không nội dung phản cảm 18+.\n• Không bàn luận chính trị, tôn giáo.', inline: true },
                    { name: '🔹 6. Hình thức xử lý', value: '• Lần 1: Cảnh cáo / Mute\n• Lần 2: Kick / Ban tạm thời\n• Lần 3: **Ban vĩnh viễn**', inline: true }
                )
                // 👉 THAY CHỮ DƯỚI CÙNG
                .setFooter({ text: 'CS2.VN - Xây dựng cộng đồng văn minh', iconURL: 'https://i.imgur.com/your-icon.png' })
                .setTimestamp()
        ]
    },

    // ==========================================
    // 2. MẪU GET ROLE (CÓ NÚT BẤM & EMOJI)
    // ==========================================
    getRole: {
        embeds: [
            new EmbedBuilder()
                .setColor('#5865F2')
                .setTitle('🎮 SPECIAL ROLES')
                .setDescription('📌 Chọn Role phù hợp để nhận thông báo và kết nối hiệu quả hơn với cộng đồng.')
                .addFields(
                    { name: '🔵 @CS:2', value: '• Người chơi **Counter-Strike 2**.\n• Nhận thông báo update.', inline: true },
                    { name: '🔴 @Premier', value: '• Leo rank **Premier CS2**.\n• Tìm đồng đội cùng trình độ.', inline: true },
                    { name: '🟠 @Faceit', value: '• Người chơi **Faceit**.\n• Tìm team, lobby, scrim.', inline: true }
                )
        ],
        components: [
            // Hàng nút bấm thứ 1 (Tối đa 5 nút/hàng)
            new ActionRowBuilder().addComponents(
                // 👉 THAY TÊN NÚT VÀ EMOJI Ở ĐÂY
                new ButtonBuilder().setCustomId('role_cs2').setLabel('CS:2').setEmoji('🔫').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('role_premier').setLabel('Premier').setEmoji('🏆').setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setCustomId('role_faceit').setLabel('Faceit').setEmoji('🔥').setStyle(ButtonStyle.Warning)
            )
        ]
    },

    // ==========================================
    // 3. HƯỚNG DẪN LẤY LINK ROOM
    // ==========================================
    linkRoom: {
        embeds: [
            new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('🔗 HƯỚNG DẪN LẤY LINK ROOM')
                .setDescription('Để mời bạn bè vào phòng nhanh chóng, hãy làm theo hướng dẫn:')
                .addFields(
                    { name: 'Bước 1:', value: 'Tham gia vào một kênh Voice bất kỳ.' },
                    { name: 'Bước 2:', value: 'Gõ lệnh `/link` vào kênh chat hoặc click chuột phải vào phòng chọn **Copy Link**.' }
                )
                .setThumbnail('https://i.imgur.com/your-thumbnail.png') // Thêm cái ảnh nhỏ góc phải cho xịn
        ]
    },

    // ==========================================
    // 4. MUA BÁN (GIAO DỊCH)
    // ==========================================
    muaBan: {
        embeds: [
            new EmbedBuilder()
                .setColor('#ffd700')
                .setTitle('💰 KÊNH MUA BÁN & GIAO DỊCH')
                .setDescription('Vui lòng đọc kỹ lưu ý trước khi tiến hành giao dịch phát sinh ngoài các kênh được xác nhận.')
                .addFields(
                    { name: '⚠️ Lưu ý quan trọng', value: '• Hãy cảnh giác với link lạ và file không rõ nguồn gốc.\n• Ban quản trị **không bao giờ** yêu cầu đăng nhập Steam qua DM.\n• Tự chịu trách nhiệm cho mọi rủi ro giao dịch cá nhân.' }
                )
        ]
    }
};
