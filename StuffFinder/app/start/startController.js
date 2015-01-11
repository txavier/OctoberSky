'use strict'
app.controller('startController',
    function StartController($scope) {
    
        $scope.mostMeTooed = {
            things: [
                {
                    imageUrl: '/assets/example/wn-crunchy-amaretti-tradizionale.png',
                    name: 'Amaretti Tradizionale',
                    location: 'address1',
                    category: 'Food->Confectionary',
                    me2: '210',
                    description: 'Best chocolate anywhere!',
                    date: '10 January 2015',
                    comments: [
                        {
                            originalPoster: true,
                            name: 'MandyK',
                            comment: "I need these in my life again.  I used to get these from the Trader Joe's down the street from where i used to live.  Up here I cant find them anywhere. Please people we have to get this item!!",
                        },
                        {
                            name: 'Gerbil112',
                            comment: "OH MAN!! I love these I want them so much!",
                        },
                        {
                            name: 'RobertK',
                            comment: "Whoa this brings me back.  Wish these were here.  Can someone find these ASAP!!",
                        },
                        {
                            name: 'AmanDaMan',
                            comment: "I dont mind chipping in $1 fo this.",
                        }
                    ]
                },
                {
                    imageUrl: '/assets/example/trader joes vanilla.jpg',
                    name: 'name2',
                    address: 'address2',
                    duration: 'duration2',
                    me2: '3',
                    description: 'description2'
                }
            ],
        };
    }
);