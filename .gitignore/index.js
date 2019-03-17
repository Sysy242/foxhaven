
const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "?"

client.login(process.env.TOKEN)
client.on('guildMemberAdd', member => {
    const welcomechannel = member.guild.channels.find((x) => x.id === '555882879348113408' );
    let b_embed = new Discord.RichEmbed()
    .setColor('ORANGE')
    .setDescription(`Welcome ${member.user.username} to the FoxHaven Support Server ! go see the server rules!`)
    return welcomechannel.send(b_embed)
    
});

client.on('guildMemberRemove', member => {
    const welcomechannel = member.guild.channels.find((x) => x.id === '555882879348113408' );
    let a_embed = new Discord.RichEmbed()
    .setColor('PURPLE')
    .setDescription(`Good Bye ${member.user.username} see you Soon to the FoxHaven Support Server!`)
    return welcomechannel.send(a_embed)

});

client.on("ready", () =>{
    console.log("Online !")
    client.user.setStatus("foxhaven.org")

});
 
client.on('message', async message => {
 
    if(message.content === "Bonjour"){
        message.reply("Hello")
        console.log("FoxHaven said Hello!")
    }
 
    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("WHITE")
        .setTitle("Commands List Help")
        .setDescription("Voici la liste de Commandes !")
        .addField("?ccs", "Contact Administrator")
        .addField("?language", "Choose your languages")
        .addField("?twitter", "Twitter Support FoxHaven")                
        .setTimestamp()
        message.channel.send(help_embed);

    }

    if(message.content === prefix + "infoserv") {
        var guildCreateDate = message.guild.createdAt.toString().split(" ");
        var infoserv_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Information du serveur")
        .addField("Nom du serveur  ", message.guild.name)
        .addField("Nombre de membres", message.guild.members.size)
        .addField("Nombre de catégories et de salons", message.guild.channels.size)
        .addField("ID du serveur :id:", message.guild.id)
        .addField("Date creation du serveur", guildCreateDate[1] + ' ' + guildCreateDate[2] + ' ' + guildCreateDate[3])
        .addField("Nombre de roles dans le serveur :", message.guild.roles.size)
        .addField("Createur du serveur :", message.guild.owner)
        .setThumbnail(message.guild.iconURL)
        message.channel .sendMessage(infoserv_embed)  
        console.log("Un utilisateur a effectué la commande d'info du serveur !")
      
        }
  
        if(message.content === prefix + "ping") {
          var guildCreateDate = message.guild.createdAt.toString().split(" ");
          var infoserv_embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(`Le bot a` + ` ${message.createdTimestamp - Date.now()}` + `ms`)
          message.channel .sendMessage(infoserv_embed)  
          console.log("Un utilisateur a effectué la commande de ping")
        
          }
    
    if(message.content.startsWith(prefix + "kick")){
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission!");
    
        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez metionner un utilisaeur")
        }q
        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Je ne sais pas si l'utilisateur existe :/")
        }
    
        if(message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour kick");
        }
    
        kick.kick().then(member => {
            message.channel.send(`${member.user.username} est kick pas ${message.author.username}`);
        });
    }
  
      if(message.content.startsWith(prefix + "ban")) {
          if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la perission");
  
          if(message.mentions.users.size === 0) {
              return message.channel.send("Vous devez mentionner un utilisateur");
          }
  
          var ban = message.guild.member(message.mentions.users.first());
          if(!ban) {
              return message.channel.send("Je ne sais pas si l'utilisateur existe");
          }
  
          if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
              return message.channel.send("Je n'ai pas la permission pour ban");
          }
          ban.ban().then(member => {
              message.channel.send(`${member.user.username} est ban par ${message.author.username} !`)
          });
          
      }
  
    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("Vous n'avez pas la permission !");
  
        let args = message.content.split(" ").slice(1);
  
        if(!args[0]) return message.channel.send("Tu dois préciser un nombre de messages à supprimer !")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages ont été supprimés !`);
        });
    }
  
    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
  
        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }
  
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }
  
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute !`);
        });
    }
  
    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
  
        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }
  
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }
  
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute !`);
        });
    }
  
    var fs = require('fs');
  
  let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
  
  if (message.content.startsWith(prefix + "warn")){
  
  if (message.channel.type === "dm") return;
  
  var mentionned = message.mentions.users.first();
  
  if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
  
  if(message.mentions.users.size === 0) {
  
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
  
  }else{
  
    const args = message.content.split(' ').slice(1);
  
    const mentioned = message.mentions.users.first();
  
    if (message.member.hasPermission('MANAGE_GUILD')){
  
      if (message.mentions.users.size != 0) {
  
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
  
          if (args.slice(1).length != 0) {
  
            const date = new Date().toUTCString();
  
            if (warns[message.guild.id] === undefined)
  
              warns[message.guild.id] = {};
  
            if (warns[message.guild.id][mentioned.id] === undefined)
  
              warns[message.guild.id][mentioned.id] = {};
  
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
  
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
  
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
  
            } else {
  
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
  
                time: date,
  
                user: message.author.id};
  
            }
  
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
  
  message.delete();
  
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
  
  message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
  
          } else {
  
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
  
          }
  
        } else {
  
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
  
        }
  
      } else {
  
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
  
      }
  
    } else {
  
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
  
    }
  
  }
  
  }
  
  
  
  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
  
  if (message.channel.type === "dm") return;
  
  if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
  
    const mentioned = message.mentions.users.first();
  
    const args = message.content.split(' ').slice(1);
  
    if (message.member.hasPermission('MANAGE_GUILD')){
  
      if (message.mentions.users.size !== 0) {
  
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
  
          try {
  
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
  
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
  
              return;
  
            }
  
          } catch (err) {
  
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
  
            return;
  
          }
  
          let arr = [];
  
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
  
          for (var warn in warns[message.guild.id][mentioned.id]) {
  
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
  
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
  
          }
  
          message.channel.send(arr.join('\n'));
  
        } else {
  
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
  
          console.log(args);
  
        }
  
      } else {
  
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
  
      }
  
    } else {
  
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
  
    }
  
  }
  
  
  
  
  
  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
  
  if (message.channel.type === "dm") return;
  
  if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
  
  const mentioned = message.mentions.users.first();
  
    const args = message.content.split(' ').slice(1);
  
    const arg2 = Number(args[1]);
  
    if (message.member.hasPermission('MANAGE_GUILD')){
  
      if (message.mentions.users.size != 0) {
  
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
  
          if (!isNaN(arg2)) {
  
            if (warns[message.guild.id][mentioned.id] === undefined) {
  
              message.channel.send(mentioned.tag+" n'a aucun warn");
  
              return;
  
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
  
              message.channel.send("**:x: Ce warn n'existe pas**");
  
              return;
  
            }
  
            delete warns[message.guild.id][mentioned.id][arg2];
  
            var i = 1;
  
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
  
              var val=warns[message.guild.id][mentioned.id][key];
  
              delete warns[message.guild.id][mentioned.id][key];
  
              key = i;
  
              warns[message.guild.id][mentioned.id][key]=val;
  
              i++;
  
            });
  
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
  
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
  
              delete warns[message.guild.id][mentioned.id];
  
            }
  
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
  
            return;
  
          } if (args[1] === "tout") {
  
            delete warns[message.guild.id][mentioned.id];
  
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
  
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
  
            return;
  
          } else {
  
            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
  
          }
  
        } else {
  
          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
  
        }
  
      } else {
  
      message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
  
      }
  
    } else {
  
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
  
    }

    if(message.content === prefix + "ping") {
      var guildCreateDate = message.guild.createdAt.toString().split(" ");
      var infoserv_embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`Le bot a` + ` ${message.createdTimestamp - Date.now()}` + `ms`)
      message.channel .sendMessage(infoserv_embed)  
      console.log("Un utilisateur a effectué la commande de ping")
    
      }
  
  }}

);
