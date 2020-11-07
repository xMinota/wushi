import Command from '../models/Command'
import { MessageEmbed } from 'discord.js'
import { addCommas } from '../utils/utils'

class AwwCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'aww',
      description: 'Summons a meme from the depths of the underworld (Reddit).',
      category: 'Images',
      aliases: ['cute-image', 'aw'],
      usage: 'meme',
      cooldown: 1
    })
  }

  async run (bot, msg, args) {
    const img = await this.client.ksoft.images.aww()
    const embed = new MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.avatarURL())
      .setDescription(`[${img.post.title}](${img.post.link})`)
      .setColor('#ff73e1')
      .setFooter(`👍 ${addCommas(img.post.upvotes)} / 👎 ${addCommas(img.post.downvotes)} | Images provided by Ksoft.si`)
      .setImage(img.url)
    msg.channel.send(embed)
  }
}

module.exports = AwwCommand
