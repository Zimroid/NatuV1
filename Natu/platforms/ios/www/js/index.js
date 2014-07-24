/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

//Le code
document.addEventListener('deviceready', function () {

    //alert js -> alert "in app"
    if (navigator.notification) { // Override default HTML alert with native dialog
        window.alert = function (message, callback, titre, boutton) {
            navigator.notification.alert(
                message,    // message
                callback,   // callback
                titre,      // title
                boutton     // buttonName
            );
        };
    }

    var page = document.getElementById("page");
    var cron;
    //var frame = document.getElementById("frame");

    //Si l'id du dresseur n'a pas encore été enregistré
    if(typeof(window.localStorage.idTrainer) == 'undefined') {
        showConfigPage();
    }
    else {
        showHomePage();
    }

}, false);

function showConfigPage()
{
    var titre = document.createElement("h1");
    var t = document.createTextNode("ID Dresseur :");
    titre.appendChild(t);

    var input = document.createElement("input");
    input.type = "text";
    input.id = "idTrainer";

    var btnValide = document.createElement("button");
    t = document.createTextNode("Valider");
    btnValide.appendChild(t);
    btnValide.addEventListener('click', function() { window.localStorage.idTrainer = document.getElementById("idTrainer").value; loading(); }, false);

    var aide = document.createElement("ul");
    var aide1 = document.createElement("li");
    var aide2 = document.createElement("li");
    var aide3 = document.createElement("li");
    t = document.createTextNode("Vous pourrez retrouver votre ID Dresseur sur pokemon-gl.com, lorsque vous serez connecté avec votre compte pokemon.com.");
    aide1.appendChild(t);
    t = document.createTextNode("Votre ID Dresseur sera à coté de votre nom de dresseur, il sera de la forme X-000-0000-X , ou les X sont des lettres et les 0 des chiffres.");
    aide2.appendChild(t);
    t = document.createTextNode("Pensez à configurer la confidentialité de votre page GTS pour la rendre publique afin que l'application puisse fonctionner.");
    aide3.appendChild(t);
    aide.appendChild(aide1);
    aide.appendChild(aide2);
    aide.appendChild(aide3);

    page.innerHTML = '';
    page.appendChild(titre);
    page.appendChild(input);
    page.appendChild(btnValide);
    page.appendChild(aide);

    if(typeof(window.localStorage.idTrainer) != 'undefined') {
        input.value = window.localStorage.idTrainer;
        var retour = document.createElement("button");
        t = document.createTextNode("Retour");
        retour.appendChild(t);
        retour.addEventListener('click', function() { location.reload(); }, false);
        page.appendChild(retour);
    }
}

function showHomePage()
{
    var titre = document.createElement("h1");
    var t = document.createTextNode("ID Dresseur :");
    titre.appendChild(t);

    var titre2 = document.createElement("h2");
    t = document.createTextNode(window.localStorage.idTrainer);
    titre2.appendChild(t);

    page.innerHTML = '';
    page.appendChild(titre);
    page.appendChild(titre2);

    //Si il y a eu une erreur
    if(typeof(window.localStorage.lastTradeGive) == 'undefined' || window.localStorage.lastTradeGive == '' || window.localStorage.lastTradeGive == null) {
        var message = document.createElement("p");
        t = document.createTextNode("Aucun échange n'a pu être trouvé.");
        message.appendChild(t);

        var aide = document.createElement("ul");
        var aide1 = document.createElement("li");
        var aide2 = document.createElement("li");
        var aide3 = document.createElement("li");
        var aide4 = document.createElement("li");
        var aide5 = document.createElement("li");
        t = document.createTextNode("Vérifiez que votre votre ID Dresseur est correct.");
        aide1.appendChild(t);
        t = document.createTextNode("Vérifiez que votre page GTS soit publique.");
        aide2.appendChild(t);
        t = document.createTextNode("Le site pokemon-gl.com est peut-être en maintenance.");
        aide3.appendChild(t);
        t = document.createTextNode("Vous n'avez peut-être encore jamais effectué d'échange via la GTS.");
        aide4.appendChild(t);
        t = document.createTextNode("Vous n'avez peut-être pas de connexion internet.");
        aide5.appendChild(t);
        aide.appendChild(aide1);
        aide.appendChild(aide2);
        aide.appendChild(aide3);
        aide.appendChild(aide4);
        aide.appendChild(aide5);

        var btnTryAgain = document.createElement("button");
        t = document.createTextNode("Réessayer");
        btnTryAgain.appendChild(t);
        btnTryAgain.addEventListener('click', function() { loading(); }, false);

        page.appendChild(message);
        page.appendChild(aide);
        page.appendChild(btnTryAgain);
    }
    else {
        var message = document.createElement("p");
        t = document.createTextNode("Dernier échange :");
        message.appendChild(t);
        var message1 = document.createElement("p");
        t = document.createTextNode(window.localStorage.lastTradeGive + " contre " + window.localStorage.lastTradeGet);
        message1.appendChild(t);
        var message2 = document.createElement("p");
        t = document.createTextNode("Effectué le : " + window.localStorage.lastTradeDate);
        message2.appendChild(t);
        var btnGo = document.createElement("button");
        t = document.createTextNode("Rechercher");
        btnGo.appendChild(t);
        btnGo.addEventListener('click', function() { loading(); }, false);


        page.appendChild(message);
        page.appendChild(message1);
        page.appendChild(message2);
        page.appendChild(btnGo);
    }
    if(typeof(cron) != 'undefined') {
        clearTimeout(cron);
    }
    else {
        //alert(":)", null, 'titre', 'btn');
        cron = setTimeout(function(){loading();}, 60*60*1000);
    }
}

function loading()
{
    var comp = window.localStorage.lastTradeGive + window.localStorage.lastTradeGet + window.localStorage.lastTradeDate;
    window.localStorage.lastTradeGive = '';
    var titre = document.createElement("h1");
    var t = document.createTextNode("Chargement en cours...");
    titre.appendChild(t);

    var titre2 = document.createElement("h2");

    page.innerHTML = '';
    page.appendChild(titre);
    page.appendChild(titre2);

    var iframe = document.createElement('iframe');
    iframe.style.display = "none";
    iframe.src = "http://3ds-sp.pokemon-gl.com/user/" + window.localStorage.idTrainer + "/gts/";
    document.body.appendChild(iframe);
    //src="http://3ds-sp.pokemon-gl.com/user/O-256-6263-E/gts/"
    /*frame.src = "http://3ds-sp.pokemon-gl.com/user/" + window.localStorage.idTrainer + "/gts/";
    location.reload();*/
    //le nombre de fois ou on va tester la connexion
    var i = 5;

    natu();
    var timer = setInterval(function(){
        i--;
        //titre2.innerHTML = titre2.innerHTML + i;
        if(i < 0) {
            clearInterval(timer);
            if(typeof(cron) != 'undefined') {
                clearTimeout(cron);
            }
            //on relance la vérification dans 2 heures (si la gts est down pas besoin de trop insister)
            cron = setTimeout(function(){loading();}, 2*60*60*1000);
            showHomePage();
            //alert(":(", null, 'titre', 'btn');
        }
        natu();
        //alert("test", null, 'titre', 'btn');
        //Si on arrive à charger le contenu du dernier échange, on arrète le timer, et on enregistre se qu'on a trouvé
        if(iframe.contentWindow.document.getElementById("recentDepos").firstChild.innerHTML.length > 3000) {
            //window.plugin.notification.local.add({ message: 'Ready!' });
            //document.getElementById('test').innerHTML = document.getElementById('frame').contentWindow.document.getElementById("recentDepos").firstChild.innerHTML;
            clearInterval(timer);
            var res = iframe.contentWindow.document.getElementById("recentDepos").firstChild;
            window.localStorage.lastTradeGive = res.getElementsByClassName("name")[0].innerHTML;
            window.localStorage.lastTradeGet = res.getElementsByClassName("name")[1].innerHTML;
            window.localStorage.lastTradeDate = res.getElementsByClassName("updateText")[0].innerHTML;
            if(comp != window.localStorage.lastTradeGive + window.localStorage.lastTradeGet + window.localStorage.lastTradeDate) {
                window.plugin.notification.local.add({ message: 'Votre ' + window.localStorage.lastTradeGive + ' a été échangé contre ' + window.localStorage.lastTradeGet });
            }
            if(typeof(cron) != 'undefined') {
                clearTimeout(cron);
            }
            //on relance une vérification automatique dans 1 heure :)
            cron = setTimeout(function(){loading();}, 60*60*1000);
            showHomePage();
        }

    }, 60*1000/5); //On laisse le temps, 1 minute... (5 essais)
}

function showHelp()
{
    var titre = document.createElement("h1");
    var t = document.createTextNode("Aide :");
    titre.appendChild(t);

    var message1 = document.createElement("p");
    t = document.createTextNode(" - Comment récupérer son ID Dresseur ?");
    message1.appendChild(t);

    var aide1 = document.createElement("ul");
    var aide11 = document.createElement("li");
    var aide12 = document.createElement("li");
    t = document.createTextNode("Connectez vous sur 3ds.pokemon-gl.com avec vos identifiants www.pokemon.com ou www.pokemon.fr.");
    aide11.appendChild(t);
    t = document.createTextNode("Vous trouverez votre ID Dresseur sur chaque page du site à coté de votre nom de dresseur et de votre avatar.");
    aide12.appendChild(t);
    aide1.appendChild(aide11);
    aide1.appendChild(aide12);

    var img1 = document.createElement("img");
    img1.src = "img/idDresseur.png";


    var message2 = document.createElement("p");
    t = document.createTextNode(" - Comment rendre sa GTS publique ?");
    message2.appendChild(t);

    var aide2 = document.createElement("ul");
    var aide21 = document.createElement("li");
    var aide22 = document.createElement("li");
    var aide23 = document.createElement("li");
    var aide24 = document.createElement("li");
    t = document.createTextNode("Connectez vous sur 3ds.pokemon-gl.com avec vos identifiants www.pokemon.com ou www.pokemon.fr.");
    aide21.appendChild(t);
    t = document.createTextNode('Rendez-vous sur votre profil et cliquez sur "Paramètre du compte".');
    aide22.appendChild(t);
    t = document.createTextNode('Cliquez sur "Changer les paramètres de confidentialité de votre profil". Puis réglez "Global Trade Station" sur Publique.');
    aide23.appendChild(t);
    t = document.createTextNode('Attention : Le réglage Publique pour la "Global Trade Station" n\'est disponible que si vous avez au préalable réglé votre profil www.pokemon.com ou www.pokemon.com sur Publique.');
    aide24.appendChild(t);
    aide2.appendChild(aide21);
    aide2.appendChild(aide22);
    aide2.appendChild(aide23);
    aide2.appendChild(aide24);
    var img2 = document.createElement("img");
    img2.src = "img/gtsPublique.png";

    var message3 = document.createElement("p");
    t = document.createTextNode(" - Conseil :");
    message3.appendChild(t);
    var aide3 = document.createElement("ul");
    var aide31 = document.createElement("li");
    var aide32 = document.createElement("li");
    t = document.createTextNode("Gardez l'application Natu en arrière plan pour être avertis lorqu'un de vos pokémon a été échanger à la GTS.");
    aide31.appendChild(t);
    t = document.createTextNode("Fermez l'application Natu lorque vous n'avez pas déposer de Pokémon à la GTS pour économiser vos accez à internet.");
    aide32.appendChild(t);
    aide3.appendChild(aide31);
    aide3.appendChild(aide32);



    page.innerHTML = '';
    page.appendChild(titre);
    page.appendChild(message1);
    page.appendChild(aide1);
    page.appendChild(img1);
    page.appendChild(message2);
    page.appendChild(aide2);
    page.appendChild(img2);
    page.appendChild(message3);
    page.appendChild(aide3);
}

function natu()
{
    var animate = document.createElement('div');
    animate.id = 'animate';
    page.appendChild(animate);
    var natu = document.createElement('div');
    natu.id = 'natu';
    var rand = Math.floor((Math.random()*100)+1)-20;
    natu.style.marginLeft = rand+'%';
    animate.appendChild(natu);
}




