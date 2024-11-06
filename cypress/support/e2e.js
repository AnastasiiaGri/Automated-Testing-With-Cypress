
import 'cypress-data-session'

import 'cypress-map'


Cypress.on('uncaught:exception', () => false)


import './commands'

import 'cypress-mochawesome-reporter/register';

