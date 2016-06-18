var nodemailer = require('nodemailer');

var transporte = nodemailer.createTransport({
  service: 'Gmail', // Como mencionei, vamos usar o Gmail
  auth: {
    user: 'bruno.giannellam@gmail.com', // Basta dizer qual o nosso usuário
    pass: '#Idkfa1406!@'             // e a senha da nossa conta
  } 
});

exports.enviarEmail = function(para, assunto, html){
  var email = {
    from: 'bruno.giannellam@gmail.com', // Quem enviou este e-mail
    to: para, // Quem receberá
    subject: assunto,  // Um assunto bacana :-) 
    html: html // O conteúdo do e-mail
  };

  transporte.sendMail(email, function(err, info){
    if(err)
      throw err; // Oops, algo de errado aconteceu.

    console.log('Email enviado! Leia as informações adicionais: ', info);
  });
};
