import Command from '../models/Command'
import utils from '../utils/utils'
import { MessageEmbed } from 'discord.js'
import db from 'quick.db'
import { level } from 'chalk'

const levels = new db.table('leveling')

class LevelsCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'levels',
      description: 'Gets the top 10 highest EXP users in the server.',
      category: 'Levels',
      aliases: [],
      usage: 'levels',
      cooldown: 5
    })
  }

  async run (bot, msg, args) {
    const list = []
    levels.all().forEach(entry => {
      if (entry.ID === msg.guild.id) {
        for (var key in entry.data) {
          list.push({ ID: key, totalexp: entry.data[key].totalExp })
        }
      }
    })
    list.sort(function (a, b) { return (b.totalExp) - (a.totalExp) })
    list.slice(0, 9)
    const embed = new MessageEmbed()
      .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL())
      .setColor('#0099ff')
      .setDescription(':trophy: Top 10 EXP users in your server.')
    let x = 1
    list.forEach(i => {
      console.log(i)
      const user = msg.guild.members.cache.get(i.ID)
      let userLevel = levels.get(`${msg.guild.id}.${i.ID}.level`)
      userLevel = userLevel || 0
      if (x === 1) {
        embed.addField(`:first_place: ${user.user.username}#${user.user.discriminator}`, `Level: :1234: **${userLevel}** | EXP: :sparkles: **${levels.get(`${msg.guild.id}.${i.ID}.exp`)}**`)
      } else if (x === 2) {
        embed.addField(`:second_place: ${user.user.username}#${user.user.discriminator}`, `Level: :1234: **${userLevel}** | EXP: :sparkles: **${levels.get(`${msg.guild.id}.${i.ID}.exp`)}**`)
      } else if (x === 3) {
        embed.addField(`:third_place: ${user.user.username}#${user.user.discriminator}`, `Level: :1234: **${userLevel}** | EXP: :sparkles: **${levels.get(`${msg.guild.id}.${i.ID}.exp`)}**`)
      } else {
        embed.addField(`#${x} ${user.user.username}#${user.user.discriminator}`, `Level: :1234: **${userLevel}** | EXP: :sparkles: **${levels.get(`${msg.guild.id}.${i.ID}.exp`)}**`)
      }
      x++
    })
    msg.channel.send(embed)
  }
}

module.exports = LevelsCommand
