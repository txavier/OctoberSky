'use strict';
app.factory('thingsService', ['$http', 'dataService', function ($http, dataService) {

    var serviceBase = '';

    dataService.getServerUrl().then(function (resource) {
        serviceBase = resource.resourceServerUrl;
    });

    var thingsServiceFactory = {};

    var _getFoundThings = function () {

        var result = {
            things: [
                {
                    category: 'Furniture',
                    comments: [
                        {
                            date: '19 January 2015',
                            name: 'hoolahoop12',
                            comment: "This is great for cakes. $12!!",
                        },
                    ],
                    description: 'Leather couch',
                    findings: [
                        {
                            comments: [
                                {
                                    date: '19 January 2015',
                                    finder: true,
                                    name: 'DoctorNoWho12',
                                    comment: 'Finally found it.  After looking high and low I finally found a furniture store here that sells a futon that folds out to a bed AND the arm rests fold out.',
                                },
                            ],
                            date: '19 January 2015',
                            downVote: 23,
                            location: 'FutonsRUs! 5 kleinstraat 4th district, Nijmegen, UAE 66778965',
                            price: '$239.56',
                            upVote: 1
                        }
                    ],
                    found: true,
                    foundDate: '19 January 2015',
                    imageUrl: '/assets/example/bg_5.jpg',
                    me2: '4',
                    name: 'Black Futon!',
                    postedDate: '10 January 2015',
                },
                {
                    category: 'Furniture',
                    comments: [{}],
                    description: 'Leather couch',
                    findings: [
                        {
                            comments: [
                                {
                                    date: '12/2/2014',
                                    finder: true,
                                    name: 'LesLion54',
                                    comment: 'Some people were looking for this. I dont care for plain chocolate ice cream much but I found this at the local store.',
                                },
                            ],
                            date: '12/2/2014',
                            downVotes: 0,
                            location: 'QueensGrocer 6 Grotestraat, Amesterdam, UAE',
                            price: '$6.78',
                            upcCode: null,
                            upVotes: 20,
                        }
                    ],
                    foundDate: '12/2/2014',
                    found: true,
                    imageUrl: '/assets/example/Walls-Selection-Hersheys.jpg',
                    me2: '86',
                    name: 'Walls Selection Hershey\'s Ice Cream!',
                    postedDate: '10 January 2015',
                    upcCode: '44393529',
                },
                {
                    category: 'Hair Products',
                    comments: [{}],
                    description: 'Oil made from coconut.',
                    findings: [
                        {
                            comments: [
                                {
                                    date: '3/23/2014',
                                    finder: true,
                                    name: 'Whatsits',
                                    comment: 'Needed this for my hair. And I know alot other people need this also. Thanks!',
                                },
                            ],
                            date: '3/23/2014',
                            downVotes: 0,
                            location: 'CornerGrocer, 23 SteinStraat The Hague, UAE 34243123',
                            price: '$23.16',
                            upcCode: '239823414',
                            upVotes: 20,
                        }
                    ],
                    found: true,
                    imageUrl: '/assets/example/coconut oil.jpg',
                    me2: '3',
                    name: 'Coconut Oil',
                    postedDate: '10 January 2014',
                },
                {
                    category: 'Food->Cereal',
                    comments: undefined,
                    description: 'Rice Crispies cereal with marshmallow.',
                    findings: [
                        {
                            comments: [
                                {
                                    date: '12/8/2014',
                                    finder: true,
                                    name: 'P45x',
                                    comment: 'After all this time.  I got it, this was the one!',
                                },
                            ],
                            date: '12/8/2014',
                            downVotes: 12,
                            location: 'OpaShop 35 FrontStraat, Rotterdam, UAE',
                            price: '$5.56',
                            upcCode: null,
                            upVotes: 1,
                        }
                    ],
                    found: true,
                    imageUrl: '/assets/example/rice crispies treates cereal.jpg',
                    me2: '2',
                    name: 'Rice Crispies Treates Cereal',
                    postedDate: '10 January 2014',
                },
                {
                    category: 'Food->Baking goods',
                    comments: undefined,
                    description: 'Trader Joes vanilla extract with alcohol.',
                    findings: [
                        {
                            comments: [
                                {
                                    date: '12/8/2014',
                                    finder: true,
                                    name: 'EnlightednedTheOne',
                                    comment: 'I am personally shipping this to my cousin who owns a grocery in Utrect now. Enjoy!',
                                },
                            ],
                            date: '1/2/2014',
                            downVotes: 3,
                            location: 'Grocery4AmericansAndDutch2 43 Haasstraat Utrect, UAE',
                            price: '$9.98',
                            upcCode: null,
                            upVotes: 12,
                        }
                    ],
                    found: true,
                    imageUrl: '/assets/example/trader joes vanilla.jpg',
                    me2: '401',
                    name: 'Trader Joes Bourbon Vanilla',
                    postedDate: '10 January 2014',
                },
            ]
        };

        return result;
    }

    var _getMostMe2Things = function () {

        var result = {
            things: [
                {
                    category: 'Food->Confectionary',
                    comments: [
                        {
                            date: '19 January 2015',
                            originalPoster: true,
                            name: 'MandyK',
                            comment: "I need these in my life again.  I used to get these from the Trader Joe's down the street from where i used to live.  Up here I cant find them anywhere. Please people we have to get this item!!",
                        },
                        {
                            date: '19 January 2015',
                            name: 'Gerbil112',
                            comment: "OH MAN!! I love these I want them so much!",
                        },
                        {
                            date: '19 January 2015',
                            name: 'RobertK',
                            comment: "Whoa this brings me back.  Wish these were here.  Can someone find these ASAP!!",
                        },
                        {
                            date: '19 January 2015',
                            name: 'AmanDaMan',
                            comment: "I dont mind chipping in $1 fo this.",
                        }
                    ],
                    description: 'Best chocolate anywhere!',
                    findings: [
                        {
                        }
                    ],
                    imageUrl: '/assets/example/wn-crunchy-amaretti-tradizionale.png',
                    me2: '210',
                    name: 'Amaretti Tradizionale',
                    postedDate: '10 January 2015',
                },
                {
                    category: 'Cooking Ingredients',
                    comments: [
                        {
                            date: '19 January 2015',
                            originalPoster: true,
                            name: 'TinaBaker',
                            comment: "Running a bakery shop, or atleast trying to start one up.  We need this supplied to us.  If anyone knows of a shipper or someone that can get this to us on a regular basis we would really appreciate it. Thanks.",
                        },
                        {
                            date: '19 January 2015',
                            name: 'M1thhews123',
                            comment: "I dont run a bakery, but I need this to bake my wife's favorite bread on mornings.",
                        },
                        {
                            date: '19 January 2015',
                            name: 'SocialAnaconda',
                            comment: "My relatives here love this when I bring it to them from New York.  They could really use this!!",
                        },
                        {
                            date: '19 January 2015',
                            name: 'gruGu',
                            comment: "I dont mind paying $1 jto see this onstoreshelves..",
                        },
                        {
                            date: '19 January 2015',
                            name: 'youTWooo',
                            comment: "I second on that."
                        }
                    ],
                    description: 'Organic flour',
                    findings: [
                        {
                        }
                    ],
                    imageUrl: '/assets/example/bobs_red_mill_brown_rice_flour_072G.jpg',
                    location: 'address1',
                    me2: '12',
                    name: "Bob's Red Mill Brown Rice Flour",
                    postedDate: '1 January 2015',
                },
                {
                    category: 'Food',
                    comments: [
                        {
                            date: '19 January 2015',
                            originalPoster: true,
                            name: 'DanTheMan',
                            comment: "There's nothing like a new york slice. $2 to anyone who can find one inn a 50 mile radius of Abu Dabhi.",
                        },
                        {
                            date: '19 January 2015',
                            name: 'Natalie234234',
                            comment: "Yes, this please!!! :)!",
                        },
                    ],
                    description: 'Pizza',
                    findings: [
                        {
                        }
                    ],
                    imageUrl: '/assets/example/ny03-pizza1.jpg',
                    location: 'address1',
                    me2: '54',
                    name: "New York Style Pizza",
                    postedDate: '17 December 2014',
                },
                {
                    category: 'Cooking Ingredients',
                    comments: [
                        {
                            date: '19 January 2015',
                            originalPoster: true,
                            name: 'JennFire',
                            comment: "This is the best chocolate bar none. $5 dollars to the nice person that can reunite this chocolate with me.",
                        },
                        {
                            date: '19 January 2015',
                            name: 'hoolahoop12',
                            comment: "This is great for cakes. $12!!",
                        },
                        {
                            date: '19 January 2015',
                            name: 'TonyFRado',
                            comment: "Baking a cake this month. Bounty!! $.58",
                        },
                        {
                            date: '19 January 2015',
                            name: 'fredicat',
                            comment: "MMMmmmm I would so love this. I have no money for bounty but would rjlly wanted this.",
                        },
                    ],
                    description: 'Pizza',
                    findings: [
                        {
                        }
                    ],
                    imageUrl: '/assets/example/betty-crocker chocolate frosting.jpg',
                    location: 'address1',
                    me2: '4',
                    name: "Betty Crocker Chocolate Frosting",
                    postedDate: '17 December 2014',
                },
            ],
        }; 

        return result;
        //return $http.get(serviceBase + 'api/things').then(function (results) {
        //    return results;
        //});
    };

    thingsServiceFactory.getMostMe2Things = _getMostMe2Things;
    thingsServiceFactory.getFoundThings = _getFoundThings;

    return thingsServiceFactory;

}]);