const { Client, GatewayIntentBits } = require('discord.js');
const embedsData = require('./embeds.js');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('ready', () => {
    console.log(`Bot đã sẵn sàng: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('!setup')) return;
    if (!message.member.permissions.has('Administrator')) return;

    const args = message.content.split(' ')[1];

    switch (args) {
        case 'rules':
            await message.channel.send(embedsData.rules);
            break;
        case 'roles':
            await message.channel.send(embedsData.getRole);
            break;
        case 'link':
            await message.channel.send(embedsData.linkRoom);
            break;
        case 'muaban':
            await message.channel.send(embedsData.muaBan);
            break;
        case 'all':
            await message.channel.send(embedsData.rules);
            await message.channel.send(embedsData.getRole);
            await message.channel.send(embedsData.linkRoom);
            await message.channel.send(embedsData.muaBan);
            break;
        default:
            message.reply('Dùng: `!setup rules`, `!setup roles`, `!setup link`, `!setup muaban` hoặc `!setup all`');
    }
});

// Xử lý khi bấm nút lấy Role
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
    
    // Ví dụ xử lý role CS2 (Bạn cần thay ID role thật của server vào đây)
    if (interaction.customId === 'role_cs2') {
        const roleId = '1465572670329454695'; 
        if (interaction.member.roles.cache.has(roleId)) {
            await interaction.member.roles.remove(roleId);
            return interaction.reply({ content: 'Đã xóa Role CS:2!', ephemeral: true });
        } else {
            await interaction.member.roles.add(roleId);
            return interaction.reply({ content: 'Đã thêm Role CS:2!', ephemeral: true });
        }
    }
});

client.login(process.env.TOKEN);
