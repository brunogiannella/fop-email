var mongoose = require('mongoose'),
FilaEmail = mongoose.model('FilaEmail');
var fs = require('fs');
var envio_emails = require("./envio_email");
var emailsConstantes = require("./../constantes/email_constantes");


const template_recuperarsenha = fs.readFileSync('./views/emails/recuperacao_senha.html', 'utf8');
const template_confirmacadastro = fs.readFileSync('./views/emails/confirmacao_cadastro.html', 'utf8');
const template_confirmaenviooferta = fs.readFileSync('./views/emails/aviso_proposta_enviada.html', 'utf8');
const template_recebimentooferta = fs.readFileSync('./views/emails/aviso_proposta_recebida.html', 'utf8');
const template_aprovacaoofertausuario = fs.readFileSync('./views/emails/aviso_proposta_aprovada.html', 'utf8');
const template_rejeicaooferta = fs.readFileSync('./views/emails/aviso_proposta_rejeitada.html', 'utf8');

exports.enviarEmails = function(){

	FilaEmail.find({'status':"PENDENTE"},function(err, emails) {

	    if (err) {
	      console.log(err);
	      return false;
	    };

	    emails.forEach (function (email) {
	    	
	    	var template = "";

	    	if(email.tipo == emailsConstantes.TIPO_EMAIL_RECUPERACAO_SENHA) {
	    		template = template_recuperarsenha;
	    	} else if(email.tipo == emailsConstantes.TIPO_EMAIL_CONFIRMACAO_CADASTRO) {

	    		template = template_confirmacadastro;
	    		template.replace("${$nome}", email.mensagem.nome);
	    		template.replace("${$hashUsuario}", email.mensagem.hashUsuario);

	    	} else if(email.tipo == emailsConstantes.TIPO_EMAIL_CONFIRMACAO_ENVIO_OFERTA) {
	    		
	    		template = template_confirmaenviooferta;
	    		template.replace("${$hashOferta}", oferta.hashIdentificador);

	    	} else if(email.tipo == emailsConstantes.TIPO_EMAIL_RECEBIMENTO_OFERTA) {
	    		
	    		template = template_recebimentooferta;

	    	} else if(email.tipo == emailsConstantes.TIPO_EMAIL_APROVACAO_OFERTA_USUARIO) {

	    		template = template_aprovacaoofertausuario;
	    		template.replace("${$hashOferta}", oferta.hashIdentificador);
				template.replace("${$numero_oferta}", oferta.id);
				template.replace("${$nome_hotel}", "");
				template.replace("${$quantidade_quartos}", oferta.quantidade_quartos);
				template.replace("${$quantidade_adultos}", oferta.quantidade_adultos);
				template.replace("${$quantidade_criancas}", oferta.quantidade_criancas);
				template.replace("${$data_entrada}", oferta.data_inicio);
				template.replace("${$data_saida}", oferta.data_fim);
				template.replace("${$valor_oferta}", oferta.valor);

	    	} else if(email.tipo == emailsConstantes.TIPO_EMAIL_REJEICAO_OFERTA_USUARIO) {

	    		template = template_rejeicaooferta;
	    		template.replace("${$hashOferta}", oferta.hashIdentificador);
				template.replace("${$numero_oferta}", oferta.id);
				template.replace("${$quantidade_quartos}", oferta.quantidade_quartos);
				template.replace("${$quantidade_adultos}", oferta.quantidade_adultos);
				template.replace("${$quantidade_criancas}", oferta.quantidade_criancas);
				template.replace("${$data_entrada}", oferta.data_inicio);
				template.replace("${$data_saida}", oferta.data_fim);
				template.replace("${$valor_oferta}", oferta.valor);

	    	} else {
	    		console.log("Email com tipo inválido. - Tipo: " + email.tipo);
	    	}


	    	envio_emails.enviarEmail(email.destinatario, email.assunto, template);
	    });

	 });
  	
};
