Feature: Pre filled cart

Background: Given I have products in my cart

Scenario: Increase quantity of a product in the cart and submit the cart
When I increase the quantity of a product <name> by <quantity>
Then I should see the updated quantity of the product in my cart
And I press the Buy button
Then I should see the <screenType> screen

Scenario: Remove a product from the cart
When I remove the product <name> from my cart
Then I should not see the product <name> in my cart

Scenario: Increase quantity of a product in the cart when API is not working
Given The submit order API is not working
When I increase the quantity of a product <name> by <quantity>
Then I should see the updated quantity of the product in my cart
And I press the Buy button
Then I should see the <screenType> screen

