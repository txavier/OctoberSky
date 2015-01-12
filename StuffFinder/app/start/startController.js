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
                    //imageUrl: '/assets/example/trader joes vanilla.jpg',
                    imageUrl: '/assets/example/bobs_red_mill_brown_rice_flour_072G.jpg',
                    name: "Bob's Red Mill Brown Rice Flour",
                    location: 'address1',
                    category: 'Cooking Ingredients',
                    me2: '12',
                    description: 'Organic flour',
                    date: '1 January 2015',
                    comments: [
                        {
                            originalPoster: true,
                            name: 'TinaBaker',
                            comment: "Running a bakery shop, or atleast trying to start one up.  We need this supplied to us.  If anyone knows of a shipper or someone that can get this to us on a regular basis we would really appreciate it. Thanks.",
                        },
                        {
                            name: 'M1thhews123',
                            comment: "I dont run a bakery, but I need this to bake my wife's favorite bread on mornings.",
                        },
                        {
                            name: 'SocialAnaconda',
                            comment: "My relatives here love this when I bring it to them from New York.  They could really use this!!",
                        },
                        {
                            name: 'gruGu',
                            comment: "I dont mind paying $1 jto see this onstoreshelves..",
                        },
                        {
                            name: 'youTWooo',
                            comment: "I second on that."
                        }
                    ]
                },
                {
                    imageUrl: '/assets/example/ny03-pizza1.jpg',
                    name: "New York Style Pizza",
                    location: 'address1',
                    category: 'Food',
                    me2: '54',
                    description: 'Pizza',
                    date: '17 December 2014',
                    comments: [
                        {
                            originalPoster: true,
                            name: 'DanTheMan',
                            comment: "There's nothing like a new york slice. $2 to anyone who can find one inn a 50 mile radius of Abu Dabhi.",
                        },
                        {
                            name: 'Natalie234234',
                            comment: "Yes, this please!!! :)!",
                        },
                    ]
                },
                {
                    imageUrl: '/assets/example/betty-crocker chocolate frosting.jpg',
                    name: "Betty Crocker Chocolate Frosting",
                    location: 'address1',
                    category: 'Cooking Ingredients',
                    me2: '4',
                    description: 'Pizza',
                    date: '17 December 2014',
                    comments: [
                        {
                            originalPoster: true,
                            name: 'JennFire',
                            comment: "This is the best chocolate bar none. $5 dollars to the nice person that can reunite this chocolate with me.",
                        },
                        {
                            name: 'hoolahoop12',
                            comment: "This is great for cakes. $12!!",
                        },
                        {
                            name: 'TonyFRado',
                            comment: "Baking a cake this month. Bounty!! $.58",
                        },
                        {
                            name: 'fredicat',
                            comment: "MMMmmmm I would so love this. I have no money for bounty but would rjlly wanted this.",
                        },
                    ]
                },
            ],
        }; 
    
        $(document).ready(function () {

            $(".player").mb_YTPlayer();

        });
   
    }
);