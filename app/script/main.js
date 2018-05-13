"use strict"

const cardElem = "{{#each this}}" +
    "<div class='card card_type_{{type}}'>" +
    "<div class='card-number'>" +
    "<p>{{inc @index}}</p>" +
    "</div>" +
    "</div>" +
    "{{/each}}";

$(document).ready(() => {
    renderPage("cardsWrapper", cards);
})

/**
* Helper инкремента для корректного вывода номера карочки.
*/
Handlebars.registerHelper("inc", function (value) {
    return parseInt(value) + 1;
});
/**
 * 
 * @param {string} idElem id элемента куда нужно вывести шаблоны
 * @param {array} cards массив карточек который нужно отрендерить.
 */
function renderPage(idElem, cards) {
    $("div#"+ idElem + " > div.card").remove();
    let cardTemplate = Handlebars.compile(cardElem);
    document.getElementById(idElem).innerHTML += cardTemplate(cards);
    $('div.card').click(function (event) {
        if (event.altKey && event.shiftKey) {
            cards.push({ type: 'wide' });
            renderPage("cardsWrapper", cards);
            return;
        }
        if (event.shiftKey) {
            cards.push({ type: 'narrow' });
            renderPage("cardsWrapper", cards);
            return;
        }
        cards.pop();
        this.remove();
    });

}


