let gmail = Gmail()
let thisUserDomain = safeGetDomain(gmail.get.user_email())

let STATE = {
  SAME_DOMAIN: 0,
  SINGLE_EXTERNAL_DOMAIN: 1,
  MULTI_EXTERNAL_DOMAINS: 2 
}

let receiveOb = []
if (localStorage["receiveOb"]) {
  receiveOb = JSON.parse(localStorage["receiveOb"])
}

//Interval to keep email list up to date.
setInterval(function () {
  $(".aFf").each(function () {
    const that = $(this)
    let img = that.find(".azp").attr("style")
    let nameEl = that.find(".ao5")
    if (nameEl.length < 1) {
      nameEl = that.find(".am")
    }
    let emailEl = $(this).find(".Sr")
    if (emailEl.length < 1) {
      emailEl = that.find(".am")
    }
    const name = nameEl.text()
    const email = emailEl.text()
    let reBody = {
      name: name,
      email: email,
    }
    let find = false

    $.each(receiveOb, function (i, e) {
      if (e.email === reBody.email) {
        find = true
        return true
      }
    })

    if (!find) {
      receiveOb.push(reBody)
      localStorage.receiveOb = JSON.stringify(receiveOb)
    }
  })
  
}, 1500)

gmail.observe.on("recipient_change", function (match, recipients) {
  let to = recipients.to,
    cc = recipients.cc,
    bcc = recipients.bcc
  let sendButton = match.dom('send_button').first()
  let names = "",
    externalDomains = {},
    allEmails = [];
  if (to) {
    for (let i = 0; i < to.length; i++) {
      allEmails.push(getEmailName(to[i]))
    }
  }
  if (cc) {
    for (let i = 0; i < cc.length; i++) {
      allEmails.push(getEmailName(cc[i]))
    }
  }
  if (bcc) {
    for (let i = 0; i < bcc.length; i++) {
      allEmails(getEmailName(bcc[i]))
    }
  }
  for (let item of allEmails) {
    let thisDomain = safeGetDomain(item.email);
    if (thisDomain !== thisUserDomain){
      externalDomains[thisDomain] = true;
    }
  }

  domainsCount = Object.keys(externalDomains).length;
  let text = "Send "
  let title = "";
  if (domainsCount === 0) {
    text += randomizeEmoji(STATE.SAME_DOMAIN)
    title = "Recipients from current organization only."
  } else if (domainsCount == 1) {
      title = "External recipients found."
      text += `${randomizeEmoji(STATE.SINGLE_EXTERNAL_DOMAIN)} (${maxListAsString(externalDomains)})`
  } else {
      title = `Multiple external recipients domains detected: ${maxListAsString(externalDomains)}!`
      text += `${randomizeEmoji(STATE.MULTI_EXTERNAL_DOMAINS)} (${maxListAsString(externalDomains)})`
  }
  sendButton.text(text);
  sendButton.title = title;
})

function getEmailName(resp) {
  let result = resp.match(/<(.*)>/)
  let email = ""
  let name = ""
  if (result && result.length > 0) {
    email = result[1]
    name = resp.replace(/<.*>/g, "").replace(/"/g, "")
  } else {
    email = resp
    name = resp.replace(/@.*/, "")
  }
  
  return {
    email,
    name
  }
}

function safeGetDomain(email){
  return email.split("@")[1] || "?";
}

function maxListAsString(domainsObj){
  let domains = Object.keys(domainsObj).join(", ");
  if (domains.length > 20) {
    return `${domains.substr(0,20)} ...`
  } else {
    return domains
  }

}

function randomizeEmoji(state) {
  let array = []
  if (state === STATE.SAME_DOMAIN){
    array = ['💫', '✅'];
  } else if (state === STATE.SINGLE_EXTERNAL_DOMAIN) {
    array = ['👀', '❓', '🚩', '⚠️']
  } else if ( state === STATE.MULTI_EXTERNAL_DOMAINS) {
    array = ['👹', '💀', '💣']
  }
  return array[Math.floor(Math.random() * array.length)];
}