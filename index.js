require('dotenv').config();
const { 
    Client, GatewayIntentBits, Partials, EmbedBuilder, 
    ActionRowBuilder, ButtonBuilder, ButtonStyle, Events
} = require('discord.js');
const express = require('express');

// =======================
// TẠO WEB SERVER ĐỂ RENDER KHÔNG TẮT BOT
// =======================
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('🤖 Bot Discord CS2 đang hoạt động bình thường!'));
app.listen(port, () => console.log(`🌐 Web server đang chạy trên port ${port}`));

// =======================
// CẤU HÌNH BOT DISCORD
// =======================
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.once(Events.ClientReady, c => {
    console.log(`✅ Bot đã khởi động với tên ${c.user.tag}`);
});

// Lệnh !setup
client.on(Events.MessageCreate, async message => {
    if (message.content === '!setup' && message.member.permissions.has('Administrator')) {
        
        // --- EMBED 1: CHỌN ROLE ---
        const rolesEmbed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle('🎮 Special Roles')
            .setDescription('Chọn role phù hợp để nhận thông báo và kết nối hiệu quả hơn với cộng đồng **Counter Strike Việt Nam**.')
            .addFields(
                { 
                    name: '━━━━━━━━━━━━━━━━━━', 
                    value: `🔹 <@&1465572670329454695>\n• Người chơi **Counter-Strike 2**.\n• Nhận thông báo update, sự kiện và giải đấu.`, 
                    inline: true 
                },
                { 
                    name: '━━━━━━━━━━━━━━━━━━', 
                    value: `🔹 <@&1481270779617480876>\n• Người chơi **CS:GO**.\n• Theo dõi tin tức, thảo luận và kỷ niệm.`, 
                    inline: true 
                },
                { 
                    name: '━━━━━━━━━━━━━━━━━━', 
                    value: `🔹 <@&1481239735140749384>\n• Người chơi **Team Finder**.\n• Tìm đồng đội cùng trình độ, leo rank.`, 
                    inline: true 
                },
                { 
                    name: '━━━━━━━━━━━━━━━━━━', 
                    value: `🔹 <@&1481239406361841695>\n• Chế độ **Rank 5v5**.\n• Kết nối người chơi tryhard nghiêm túc.`, 
                    inline: true 
                },
                { 
                    name: '━━━━━━━━━━━━━━━━━━', 
                    value: `🔹 <@&1465572749442547890>\n• Tham gia **Community Server**.\n• Retake, Surf, DM, Zombie...`, 
                    inline: true 
                },
                { 
                    name: '━━━━━━━━━━━━━━━━━━', 
                    value: `🔹 <@&1465574099723227304>\n• Dành cho **Influencer**.\n• Streamer / YouTuber / TikToker.`, 
                    inline: true 
                }
            )
            .setFooter({ text: '📌 Nhấn nút bên dưới để nhận hoặc gỡ Role tương ứng.' });

        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('role_cs2').setLabel('CS:2').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('role_csgo').setLabel('CS:GO').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('role_teamfindercs2').setLabel('Team Finder'),
            new ButtonBuilder().setCustomId('role_competitive').setLabel('Competitive').setStyle(ButtonStyle.Primary),
        );
            
        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('role_server_community').setLabel('Server Community').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('role_influencer').setLabel('Influencer').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('role_seller').setLabel('Seller').setStyle(ButtonStyle.Primary)
        );

        // --- EMBED 2: QUY ĐỊNH ---
        const rulesEmbed = new EmbedBuilder()
            .setColor('#e74c3c')
            .setTitle('Quy định & Nguyên tắc xử lý')
            .setDescription('Mọi hành vi vi phạm sẽ được xử lý dựa trên mức độ nghiêm trọng.\n\nAdmin có quyền **Ban vĩnh viễn ngay lập tức** đối với các trường hợp nghiêm trọng **mà không cần cảnh cáo trước**.\n\nHình thức và thời gian xử lý chỉ mang tính tham khảo, **quyết định cuối cùng thuộc về Admin**.')
            .addFields(
                { name: '🔷 1. Ứng xử', value: '• Tôn trọng tất cả thành viên.\n• Không chửi bậy, xúc phạm, công kích cá nhân.\n• Không gây war, toxic quá mức.', inline: true },
                { name: '🔷 2. Spam & Quảng cáo', value: '• Không spam tin nhắn, emoji, reaction.\n• Không quảng cáo Discord, server, website... khi chưa được Admin duyệt.', inline: true },
                { name: '🔷 3. Voice Chat', value: '• Không spam mic, bật nhạc.\n• Giữ thái độ văn minh.\n• Tôn trọng người khác khi nói chuyện.', inline: true },
                { name: '🔷 4. Hack & Gian lận', value: '• Cấm hack, cheat, phần mềm thứ ba.\n• Cấm lợi dụng bug.\n→ Vi phạm sẽ bị **Ban vĩnh viễn**.', inline: true },
                { name: '🔷 5. Nội dung & Chủ đề', value: '• Không đăng nội dung khiêu dâm, phản cảm, bạo lực mạnh.\n• Không đăng nội dung chính trị, tôn giáo, xuyên tạc,...', inline: true },
                { name: '🔷 6. Hình thức xử lý', value: '• Lần 1: Cảnh cáo / Mute\n• Lần 2: Kick / Ban tạm thời\n• Lần 3: **Ban vĩnh viễn**', inline: true }
            );

        // --- EMBED 3: KÊNH CHÍNH THỨC (ĐÃ FIX LỖI DÒNG 108) ---
        const infoEmbed = new EmbedBuilder()
            .setColor('#3498db')
            .setTitle('Kênh chính thức & Lưu ý')
            .setDescription(`Vui lòng chỉ theo dõi và liên hệ thông qua các kênh chính thức của **Verdict | CSVN**.
Chúng tôi **không chịu trách nhiệm** đối với thông tin, hành vi hoặc giao dịch phát sinh ngoài các kênh được xác nhận.

🌐 **Website**: sắp có
📘 **Fanpage**: hiện chx có
🎵 **TikTok**: sẽ có trong tg lai

👥 **Group Facebook**: https://www.facebook.com/groups/831193133166623

⚠️ **Lưu ý quan trọng**
• Hãy cảnh giác với link lạ và file không rõ nguồn gốc.
• Ban quản trị **không bao giờ** yêu cầu đăng nhập Steam hay xác minh tài khoản qua DM.`)
            .setFooter({ text: 'Verdict | CSVN – Xây dựng cộng đồng văn minh, an toàn và bền vững' });

        await message.delete().catch(() => {});
        await message.channel.send({ embeds: [rolesEmbed], components: [row1, row2] });
        await message.channel.send({ embeds: [rulesEmbed] });
        await message.channel.send({ embeds: [infoEmbed] });
    }
});

// Xử lý nút bấm
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;

    const roleMapping = {
        'role_cs2': process.env.ROLE_CS2_ID,
        'role_csgo': process.env.ROLE_CSGO_ID,
        'role_premier': process.env.ROLE_PREMIER_ID,
        'role_competitive': process.env.ROLE_COMPETITIVE_ID,
        'role_faceit': process.env.ROLE_FACEIT_ID,
        'role_server_community': process.env.ROLE_SERVER_COMMUNITY_ID,
        'role_verify': process.env.ROLE_VERIFY_ID,
        'role_influencer': process.env.ROLE_INFLUENCER_ID,
        'role_seller': process.env.ROLE_SELLER_ID,
    };

    const roleIdToAssign = roleMapping[interaction.customId];
    if (!roleIdToAssign) return;

    try {
        const role = interaction.guild.roles.cache.get(roleIdToAssign);
        if (!role) {
            return interaction.reply({ content: '❌ Role chưa được setup đúng ID.', ephemeral: true });
        }

        const member = interaction.member;
        if (member.roles.cache.has(roleIdToAssign)) {
            await member.roles.remove(roleIdToAssign);
            return interaction.reply({ content: `➖ Bạn đã gỡ role **${role.name}**!`, ephemeral: true });
        } else {
            await member.roles.add(roleIdToAssign);
            return interaction.reply({ content: `✅ Bạn đã nhận role **${role.name}**!`, ephemeral: true });
        }
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: '❌ Lỗi cấp quyền. Kiểm tra lại xếp hạng role của Bot.', ephemeral: true });
    }
});

client.login(process.env.BOT_TOKEN);
