function navTabsControl(elem){
	let liTabs 		= document.getElementsByClassName('nav-tabs')[0];
	let tabContent 	= document.getElementsByClassName('tab-content')[0];
	for(let i = 0; i < liTabs.children.length; i++){
		let liNow  	= liTabs.children[i];
		let tabNow 	= tabContent.children[i];
		liNow.className 	= (liNow.id == elem.id) ? 'active' 	: ''; 
		tabNow.className 	= (tabNow.id == elem.id) ? 'tab-pane active' : 'tab-pane'; 
	}
}
window.addEventListener('load', function () {
	console.log('****************************************************')
	let liTabs = document.getElementsByClassName('nav-tabs')[0];
	for(let i = 0; i < liTabs.children.length; i++){
		liTabs.children[i].onclick = function () { navTabsControl(this) };
	}
})



function fnCustomDelete(elem) {
	fnWdkRemoveChild(elem);
}
dinamicTableMethods = {
	add: function (elem) { wdkAddChild(elem.classList[1]); },
	remove: function (elem) { fnWdkRemoveChild(elem); }
}
function operationDinamic(){
	let elems 	= document.getElementsByClassName('dnmic');
	console.log(elems)
	for(let i = 0; i < elems.length; i++){
		(elems[i].type == 'button') ? elems[i].onclick = function () { dinamicTableMethods.add(this); } : '' ;
	}
}window.addEventListener('load', operationDinamic)

function aaa(){
	let aaa = document.getElementById('cmb_NomeSolicita').value
	if(aaa == '99990006'){
		document.getElementById('PlanoTrabalho').style.display = 'block'
	}
}window.addEventListener('load', aaa)





function setSuper(){
    document.getElementById("cmb_GerenteSolicitante").onchange = function () { getSuper() }
}
function getSuper(){
    var hdn_Super   = document.getElementById("numSuperior")
    console.log(DatasetFactory.getDataset("dsc_Unidades", null, null, null))
    setTimeout(hdn_Super.value = document.getElementById("cmb_GerenteSolicitante").value, 6000);
    var dataset     = DatasetFactory.getDataset("dsc_Unidades", null, null, null)
    for(i = 0; i < dataset.values.length; i++){
        var mat     = dataset.values[i].Matricula
        if(mat == hdn_Super.value){
            var un  = dataset.values[i].NomeUnidade
            document.getElementById("zm_UnidadeSolicitante").value = un
            dir = dataset.values[i].MatSuperior
        }
    }
} 
window.addEventListener("load", setSuper)

function checkedValidate(){
	var panel = document.getElementById("ReceitaPrevista");
	var check = panel.getElementsByTagName("input")
	var Contrapartida = document.getElementById("txt_Contrapartida");
	var Pagamento = document.getElementById("txt_Pagamento");
	var Parcelas = document.getElementById("txt_Parcelas");
	for(i=0; i < check.length;i++){
		if(check[i].type == "radio" && check[i].checked == true){
			if(check[i].value == "Nao"){
				var disabled = document.createAttribute("readonly");
				Contrapartida.attributes.setNamedItem(disabled);
				Pagamento.disabled = true;
				var disabled = document.createAttribute("readonly");
				Parcelas.attributes.setNamedItem(disabled);
				document.getElementById("txt_Contrapartida").value = "0,00"
				document.getElementById("txt_Pagamento").value = "Selecione"
				document.getElementById("txt_Parcelas").value = ""
			}
		}
	}
}

function formatarConvenio(elem) {
	valor = elem.value
	valor = valor + '';
	valor = parseInt(valor.replace(/[\D]+/g, ''));
	valor = valor + '';
	valor = valor.replace(/([0-9]{4})$/g, "/$1");

	if (valor.length > 5) {
		valor = valor.replace(/([0-9]{3}),([0-9]{4}$)/g, "$1/$2");
	}
	if (valor == null || valor == "" || valor == 0 || valor == "NaN") {
		valor = "000/0000"
	}
	document.getElementById(elem.id).value = valor
}

function validaContra(){
	var valor = document.getElementById("txt_Pagamento").value
	var Parcelas = document.getElementById("txt_Parcelas");
	if(valor == "Especie"){
		var disabled = document.createAttribute("readonly");
		Parcelas.attributes.setNamedItem(disabled);
		document.getElementById("txt_Parcelas").value = ""
	}
	else{
		Parcelas.attributes.removeNamedItem("readonly");
	}
}

function enableContrapartida(elem) {
	var check = elem.value
	var Contrapartida = document.getElementById("txt_Contrapartida");
	var Pagamento = document.getElementById("txt_Pagamento");
	var Parcelas = document.getElementById("txt_Parcelas");

	if (check == "Nao") {
		var disabled = document.createAttribute("readonly");
		Contrapartida.attributes.setNamedItem(disabled);
		Pagamento.disabled = true;
		var disabled = document.createAttribute("readonly");
		Parcelas.attributes.setNamedItem(disabled);
		document.getElementById("txt_Contrapartida").value = "0,00"
		document.getElementById("txt_Pagamento").value = "Selecione"
		document.getElementById("txt_Parcelas").value = ""
	
	}
	else {
		Contrapartida.attributes.removeNamedItem("readonly");
		Pagamento.disabled = false;
		Parcelas.attributes.removeNamedItem("readonly");

		PorcentContra()
	}
}

function PorcentContra(){
	var valor = document.getElementById("txt_Custo").value
	
	valor = valor + '';
	valor = parseInt(valor.replace(/[\D]+/g,''));
	valor = valor + '';
	valor = parseFloat(valor.replace(/([0-9]{2})$/g, ".$1"));

	valorFinal = 30 / 100 * valor
	valorFinal = valorFinal + '';
	valorFinal = valorFinal.replace(/[\D]+/g, ",");
	var valor = moeda.desformatar(valorFinal)
	var valorDif = moeda.formatar(valor)

	document.getElementById("txt_Contrapartida").value = valorDif
}

function formatarMoeda(elem) {
	var id = elem.id
	var valor = moeda.desformatar(elem.value)
	var valorDif = moeda.formatar(valor)
	document.getElementById(id).value = valorDif
}
var moeda = {
	desformatar: function (num) {															//*Desformata valores com a formatação da função instanciada na 'var moeda'
		num = num.replace(/\./g, "");
		num = num.replace(/\,/g, ".");
		return parseFloat(num);
	},
	formatar: function (num) {																//*Formata os valores
		x = 0;
		if (num < 0) {
			num 	= Math.abs(num);
			x 		= 1;
		}
		if (isNaN(num)) num = "0";
		
		cents 	= Math.floor((num * 100 + 0.5) % 100);
		num 	= Math.floor((num * 100 + 0.5) / 100).toString();

		if (cents < 10) cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++){
                num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
            }
		ret = num + ',' + cents;
		if (x == 1) ret = ' – ' + ret;
		return ret;
	},
	arredondar: function (num) {															
		return Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2);							
	}
}
function formataCasasDecimais(valor) {
	valor = "" + valor;
	if (valor.lastIndexOf(".") == -1) {
		valor = valor + ".00";
	}
	else {
		var casasDecimais = valor.substring(valor.lastIndexOf(".") + 1, valor.length);
		if (casasDecimais.length > 2)
			casasDecimais = casasDecimais.substring(0, 2);
		else {
			while (casasDecimais.length < 2) {
				casasDecimais = casasDecimais + "0";
			}
		}
		valor = valor.substring(0, valor.lastIndexOf(".") + 1) + casasDecimais;
	}
	return valor;
}




function setSelectedZoomItem(selectedItem) 
{
    
    //ok
    if(selectedItem.inputId == "txt_projeto")
    {
        $('#codProjeto').val(selectedItem.CODCCUSTO);
        atualizaZoomFilterAcao(selectedItem.CODCCUSTO);
    }

    //ok
    if(selectedItem.inputId == "txt_acao")
    {
        $('#codAcao').val(selectedItem.CODACAO);
        var codProjeto = $('#codProjeto').val();
        atualizaZoomFilterRecursos(codProjeto, selectedItem.CODACAO);
        
        buscaSaldo(document.getElementById("codProjeto"),document.getElementById("codAcao"))

    }
    
}

function removedZoomItem(removedItem) 
{
    if(removedItem.inputId == 'txt_projeto')
    {
        window['txt_acao'].clear();
        window['txt_recursos'].clear();
        $("#codProjeto").val(0);
        $("#codAcao").val(0);
        $("#codRecurso").val(0);
        $("#txt_saldo").val("0,00");
    }
}   

function atualizaZoomFilterAcao(codProjeto)
{
    reloadZoomFilterValues("txt_acao", "txt_projeto,"+codProjeto);
}

function atualizaZoomFilterRecursos(codProjeto, codAcao)
{
    reloadZoomFilterValues("txt_recursos", "txt_projeto,"+codProjeto+",txt_acao,"+codAcao);
}


function buscaSaldo(projeto,acao){
        
        var campo = acao;
        
        if(campo.value != ""){ 
            var cc1 = new Array(projeto.value+"."+acao.value);
            datasetsaldo = DatasetFactory.getDataset("dssaldo", cc1, null, null);
            if (datasetsaldo.values.length > 0){    
                var record = datasetsaldo.values[0];
                saldo = eval("record[\"SALDO\"]");
            }
            saldo = formataCasasDecimais(saldo)
            saldo = moeda.formatar(saldo)
            
            if(saldo == 0 || saldo == "0,00"){
                document.getElementById("txt_saldo").value = saldo;
                document.getElementById("txt_saldo").style = "background-color:#ea8989";
            } 
            else if(saldo != 0 || saldo != "0,00") {
                document.getElementById("txt_saldo").value = saldo;
                document.getElementById("txt_saldo").style = "background-color:#86dc9c";
            }
        }
    }