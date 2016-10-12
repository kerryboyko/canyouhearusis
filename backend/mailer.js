const transporter = nodemailer.createTransport();

const makeEmailText = (amount, currency) => "Thank you for your donation / Takk fyrir að styðja nýja stjórnarskrá og lýðræðið í landinu okkar." +
'\n\n' + 'Your Donation / Styðja: ' + (currency === 'usd' ? "$" + (amount / 100) : (amount/100) ) +  " " + currency.toUpperCase() +
'\n\n' + '-- CanYouHearUs.is';

export const sendThankYou = (to, amount, currency) => {

  let mailOptions = {
    from: '"Can You Hear Us" <thankyou@canyouhearus.is>', // sender address
    to: to, // list of receivers
    subject: 'Thank you/Takk! (CAN YOU HEAR US? / HEYRIÐI Í OKKUR?)',
    text: makeEmailText(amount, currency), // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });

};
