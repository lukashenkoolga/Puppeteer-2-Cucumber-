Feature: Booking ticket
    Scenario: Should book one seat
        Given user is on "qamid" page
        When user booking one seat
        Then user succsessfull booking

    Scenario: User booking one VIP seat
        Given user is on "qamid" page
        When user booking one VIP seat
        Then user succsessfull booking

    Scenario: Should don't booking seat
        Given user is on "qamid" page
        When user don't booking one seat
        Then user don't booking