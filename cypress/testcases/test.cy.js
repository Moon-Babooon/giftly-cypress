/*
Could not implement soft assertions due to the system error
*/

import { productCards, search } from "../support/utils";

const url = 'https://giftly.klickly-dev.com/marketplace';

describe('Giftly Test Assignment', () => {
    it('Search test', () => {
        cy.visit(url)
        let itemName = 'Prince Michael'
        search(itemName)
        productCards().find('h3').first().should('contain.text', itemName).each(($el) => {
            if ($el.text()===itemName) {
                cy.wrap($el).click({force: true})
            }
        })
        cy.get('h2[data-e2e="product-title"]').should('be.visible').should('have.text', itemName)
    })

    it('Product list verification', () => {
        cy.visit(url)
        const itemName = "STAR WARS"
        search(itemName)
        productCards().find('h3').filter(':contains('+itemName+')').should('have.length.greaterThan', 1)
        productCards().find('h3').first().should('contain.text', itemName)
        productCards().find('h3').last().should('contain.text', itemName)
    })

    it('Pagination test', () => {
        cy.visit(url)

        var firstPage = []

        productCards().find('h3').each($value => {
            firstPage.push($value.text())
        })

        productCards().last().scrollIntoView()
        cy.get('p.hUlWjS').should('not.contain.text', '24')

        productCards().find('h3').each(($value, index) => {
            expect($value.text()).to.not.equal(firstPage[index])
        })
    })
})