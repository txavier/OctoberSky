namespace StuffFinder.Data.Migrations
{
    using Newtonsoft.Json;
    using StuffFinder.Core.Models;
    using StuffFinder.Core.Services;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<StuffFinder.Data.stuffFinderDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(StuffFinder.Data.stuffFinderDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            // Old seed method no longer applicable now with the 
            // addition of the new location table.
            //var things = SeedThingsTable();

            //context.things.AddOrUpdate(p => p.name, things.ToArray());

            context.categories.AddOrUpdate(p => p.name,
                new category { name = "furniture" },
                new category { name = "food" });
        }

        public IEnumerable<thing> SeedThingsTable()
        {
            string output = @"
             [{
                    category: 'Food->Confectionary',
                    comments: [
                        {
                            date: '19 January 2015',
                            originalPoster: true,
                            name: 'MandyK',
                            commentText: 'I need these in my life again.  I used to get these from the Trader Joe\'s down the street from where i used to live.  Up here I cant find them anywhere. Please people we have to get this item!!'
                        },
                        {
                            date: '19 January 2015',
                            name: 'Gerbil112',
                            commentText: 'OH MAN!! I love these I want them so much!',
                        },
                        {
                            date: '19 January 2015',
                            name: 'RobertK',
                            commentText: 'Whoa this brings me back.  Wish these were here.  Can someone find these ASAP!!',
                        },
                        {
                            date: '19 January 2015',
                            name: 'AmanDaMan',
                            commentText: 'I dont mind chipping in $1 fo this.',
                        }
                    ],
                    description: 'Best chocolate anywhere!',
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
                            commentText: 'Running a bakery shop, or atleast trying to start one up.  We need this supplied to us.  If anyone knows of a shipper or someone that can get this to us on a regular basis we would really appreciate it. Thanks.',
                        },
                        {
                            date: '19 January 2015',
                            name: 'M1thhews123',
                            commentText: 'I dont run a bakery, but I need this to bake my wife\'s favorite bread on mornings.',
                        },
                        {
                            date: '19 January 2015',
                            name: 'SocialAnaconda',
                            commentText: 'My relatives here love this when I bring it to them from New York.  They could really use this!!',
                        },
                        {
                            date: '19 January 2015',
                            name: 'gruGu',
                            commentText: 'I dont mind paying $1 jto see this onstoreshelves.',
                        },
                        {
                            date: '19 January 2015',
                            name: 'youTWooo',
                            commentText: 'I second on that.'
                        }
                    ],
                    description: 'Organic flour',
                    imageUrl: '/assets/example/bobs_red_mill_brown_rice_flour_072G.jpg',
                    location: 'address1',
                    me2: '12',
                    name: 'Bob\'s Red Mill Brown Rice Flour',
                    postedDate: '1 January 2015',
                },
                {
                    category: 'Food',
                    comments: [
                        {
                            date: '19 January 2015',
                            originalPoster: true,
                            name: 'DanTheMan',
                            commentText: 'There\'s nothing like a new york slice. $2 to anyone who can find one inn a 50 mile radius of Abu Dabhi.',
                        },
                        {
                            date: '19 January 2015',
                            name: 'Natalie234234',
                            commentText: 'Yes, this please!!! :)!',
                        },
                    ],
                    description: 'Pizza',
                    imageUrl: '/assets/example/ny03-pizza1.jpg',
                    location: 'address1',
                    me2: '54',
                    name: 'New York Style Pizza',
                    postedDate: '17 December 2014',
                },
                {
                    category: 'Cooking Ingredients',
                    comments: [
                        {
                            date: '19 January 2015',
                            originalPoster: true,
                            name: 'JennFire',
                            commentText: 'This is the best chocolate bar none. $5 dollars to the nice person that can reunite this chocolate with me.',
                        },
                        {
                            date: '19 January 2015',
                            name: 'hoolahoop12',
                            commentText: 'This is great for cakes. $12!!',
                        },
                        {
                            date: '19 January 2015',
                            name: 'TonyFRado',
                            commentText: 'Baking a cake this month. Bounty!! $.58',
                        },
                        {
                            date: '19 January 2015',
                            name: 'fredicat',
                            commentText: 'MMMmmmm I would so love this. I have no money for bounty but would rjlly wanted this.',
                        },
                    ],
                    description: 'Pizza',
                    imageUrl: '/assets/example/betty-crocker chocolate frosting.jpg',
                    location: 'address1',
                    me2: '4',
                    name: 'Betty Crocker Chocolate Frosting',
                    postedDate: '17 December 2014',
                },
                {
                    category: 'Furniture',
                    comments: [
                        {
                            date: '19 January 2015',
                            name: 'hoolahoop12',
                            commentText: 'This is great for cakes. $12!!',
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
                                    commentText: 'Finally found it.  After looking high and low I finally found a furniture store here that sells a futon that folds out to a bed AND the arm rests fold out.',
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
                    description: 'Leather couch',
                    findings: [
                        {
                            comments: [
                                {
                                    date: '12/2/2014',
                                    finder: true,
                                    name: 'LesLion54',
                                    commentText: 'Some people were looking for this. I dont care for plain chocolate ice cream much but I found this at the local store.',
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
                    description: 'Oil made from coconut.',
                    findings: [
                        {
                            comments: [
                                {
                                    date: '3/23/2014',
                                    finder: true,
                                    name: 'Whatsits',
                                    commentText: 'Needed this for my hair. And I know alot other people need this also. Thanks!',
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
                                    commentText: 'After all this time.  I got it, this was the one!',
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
                                    commentText: 'I am personally shipping this to my cousin who owns a grocery in Utrect now. Enjoy!',
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
            ]";

            var deserializedProduct = JsonConvert.DeserializeObject<List<thing>>(output);

            return deserializedProduct;
        }
    }
}
