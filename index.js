require('dotenv').config();
const { 
    Client, GatewayIntentBits, Partials, EmbedBuilder, 
    ActionRowBuilder, ButtonBuilder, ButtonStyle, Events
} = require('discord.js');
const express = require('express');

// =======================
// WEB SERVER (Giữ bot online)
// =======================
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('🤖 Bot Discord CS2 đang hoạt động!'));
app.listen(port, () => console.log(`🌐 Web server chạy tại port ${port}`));

// =======================
// CẤU HÌNH BOT
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
    console.log(`✅ Bot đã khởi động: ${c.user.tag}`);
});

// Lệnh !setup
client.on(Events.MessageCreate, async message => {
    if (message.content === '!setup' && message.member.permissions.has('Administrator')) {
        
        // --- EMBED 1: CHỌN ROLE ---
        const rolesEmbed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle('🎮 Special Roles')
            .setDescription('Chọn role phù hợp để nhận thông báo từ **Counter Strike Việt Nam**.')
            .addFields(
                { name: '━━━━━━━━━━━━━━━━━━', value: `🔹 <@&1465572670329454695>\n• Người chơi **CS2**.`, inline: true },
                { name: '━━━━━━━━━━━━━━━━━━', value: `🔹 <@&1481270779617480876>\n• Người chơi **CS:GO**.`, inline: true },
                { name: '━━━━━━━━━━━━━━━━━━', value: `🔹 <@&1481239735140749384>\n• **Team Finder CS2**.`, inline: true },
                { name: '━━━━━━━━━━━━━━━━━━', value: `🔹 <@&1481239406361841695>\n• Chế độ **Rank 5v5**.`, inline: true },
                { name: '━━━━━━━━━━━━━━━━━━', value: `🔹 <@&1465572749442547890>\n• **Community Server**.`, inline: true },
                { name: '━━━━━━━━━━━━━━━━━━', value: `🔹 <@&1465574099723227304>\n• **Influencer**.`, inline: true }
            )
            .setFooter({ text: '📌 Nhấn nút bên dưới để nhận hoặc gỡ Role.' });

        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('role_cs2').setLabel('CS:2').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('role_csgo').setLabel('CS:GO').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('role_teamfindercs2').setLabel('Team Finder').setStyle(ButtonStyle.Success), // Màu xanh lá cho nổi
            new ButtonBuilder().setCustomId('role_competitive').setLabel('Competitive').setStyle(ButtonStyle.Primary),
        );
            
        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('role_server_community').setLabel('Server Community').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('role_influencer').setLabel('Influencer').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('role_seller').setLabel('Seller').setStyle(ButtonStyle.Danger) // Màu đỏ
        );

        // --- EMBED 2: QUY ĐỊNH ---
        const rulesEmbed = new EmbedBuilder()
            .setColor('#e74c3c')
            .setTitle('Quy định & Nguyên tắc xử lý')
            .setDescription('Mọi hành vi vi phạm sẽ được xử lý dựa trên mức độ nghiêm trọng.\n\nAdmin có quyền **Ban vĩnh viễn** đối với các trường hợp nghiêm trọng.');

        // --- EMBED 3: THÔNG TIN ---
        const infoEmbed = new EmbedBuilder()
            .setColor('#3498db')
            .setTitle('Kênh chính thức & Lưu ý')
            .setDescription(`🌐 **Website**: sắp có\n📘 **Fanpage**: hiện chx có\n🎵 **TikTok**: sẽ có trong tg lai\n\n👥 **Group**: https://www.facebook.com/groups/831193133166623`)
            .setFooter({ text: 'Verdict | CSVN – Xây dựng cộng đồng văn minh' });

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
        'role_teamfindercs2': process.env.ROLE_TEAMFINDER_ID, // Khớp với ID nút
        'role_competitive': process.env.ROLE_COMPETITIVE_ID,
        'role_server_community': process.env.ROLE_SERVER_COMMUNITY_ID,
        'role_influencer': process.env.ROLE_INFLUENCER_ID,
        'role_seller': process.env.ROLE_SELLER_ID,
    };

    const roleIdToAssign = roleMapping[interaction.customId];
    if (!roleIdToAssign) return;

    try {
        const role = interaction.guild.roles.cache.get(roleIdToAssign);
        if (!role) return interaction.reply({ content: '❌ Lỗi: Kiểm tra lại ID Role trong file .env!', ephemeral: true });

        if (interaction.member.roles.cache.has(roleIdToAssign)) {
            await interaction.member.roles.remove(roleIdToAssign);
            return interaction.reply({ content: `➖ Đã gỡ role **${role.name}**!`, ephemeral: true });
        } else {
            await interaction.member.roles.add(roleIdToAssign);
            return interaction.reply({ content: `✅ Đã nhận role **${role.name}**!`, ephemeral: true });
        }
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: '❌ Lỗi: Hãy kéo Role của Bot lên cao hơn các Role khác trong cài đặt Server!', ephemeral: true });
    }
});

client.login(process.env.BOT_TOKEN);
