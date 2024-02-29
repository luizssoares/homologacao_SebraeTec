function displayFields(form,customHTML){
	
var Now_State = parseInt(getValue("WKNumState"));
var usuario = getValue("WKUser");
var data = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	
switch(Now_State){

			case 0:

				form.setValue("cmb_NomeSolicita",usuario);
				form.setValue("dt_DataSolicita",data.format(new Date()));
				
				form.setValue("hd_x",1);
				form.setValue("hdn_tipoContrato", "SGC/SGF")
				form.setValue("cmb_NomeSolicita",usuario);
				form.setValue("dt_DataSolicita",data.format(new Date()));
				form.setValue("txt_valorHora","0,00");
				form.setValue("txt_valor","0,00");
				form.setValue("txt_Custo","0,00");
				form.setValue("txt_valorC","0,00");
				form.setValue("txt_saldo","0,00");
				form.setValue("txt_CustoTotal","0,00");
				form.setValue("txt_Contrapartida","0,00");
				form.setValue("txt_DespesaViagem","0,00");
				form.setValue("txt_NumeroConvenio","000/0000");
				form.setVisibleById("valorSelecionado",false);
				form.setVisibleById("div_PastaAzul",false);
				form.setVisibleById("Aprovação_Superintendencia",false);
				form.setVisibleById("Aprovação_Demandante",false);
				form.setVisibleById("Numero_Process_Atual",false);
				form.setVisibleById("CodContratacao",false);
				form.setVisibleById("zm_fornecedor_idx",false);

				var matricula = getValue("WKUser");
				var f1 = new Array(matricula);
				
				/*datasetsuperior = DatasetFactory.getDataset("dsSuperior", f1, null, null);
				numerosuperior = datasetsuperior.getValue(0, "CHAPASUPERIOR");
				nomesuperior = datasetsuperior.getValue(0, "NOMESUPERIOR");
				descricao = datasetsuperior.getValue(0, "DESCRICAO");
				nome = datasetsuperior.getValue(0, "NOME");
				form.setValue("hd_nome",nome);
				form.setValue("hd_numSuperior",numerosuperior);
				form.setValue("cmb_GerenteSolicitante",nomesuperior);
				form.setValue("zm_UnidadeSolicitante",descricao);
*/
			break;

			case 13:
				

			break;
				

				
			default:

			break;	
			
	}	
}