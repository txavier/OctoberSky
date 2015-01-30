namespace StuffFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.comments",
                c => new
                    {
                        commentId = c.Int(nullable: false, identity: true),
                        findingId = c.Int(nullable: false),
                        date = c.String(),
                        finder = c.Boolean(nullable: false),
                        name = c.String(),
                        commentText = c.String(),
                        thing_thingId = c.Int(),
                    })
                .PrimaryKey(t => t.commentId)
                .ForeignKey("dbo.findings", t => t.findingId, cascadeDelete: true)
                .ForeignKey("dbo.thing", t => t.thing_thingId)
                .Index(t => t.findingId)
                .Index(t => t.thing_thingId);
            
            CreateTable(
                "dbo.findings",
                c => new
                    {
                        findingId = c.Int(nullable: false, identity: true),
                        thingId = c.Int(nullable: false),
                        date = c.String(),
                        downVote = c.Int(nullable: false),
                        location = c.String(),
                        price = c.String(),
                        upVote = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.findingId)
                .ForeignKey("dbo.thing", t => t.thingId, cascadeDelete: true)
                .Index(t => t.thingId);
            
            CreateTable(
                "dbo.thing",
                c => new
                    {
                        thingId = c.Int(nullable: false, identity: true),
                        name = c.String(nullable: false, maxLength: 255),
                        addressLine1 = c.String(maxLength: 255),
                        addressLine2 = c.String(maxLength: 255),
                        city = c.String(maxLength: 255),
                        country = c.String(maxLength: 255),
                        latitude = c.Double(),
                        longitude = c.Double(),
                        dateSpotted = c.DateTime(precision: 7, storeType: "datetime2"),
                        priceSpotted = c.String(maxLength: 50),
                        upcCode = c.String(maxLength: 50),
                        category = c.String(),
                        description = c.String(),
                        found = c.Boolean(nullable: false),
                        foundDate = c.String(),
                        imageUrl = c.String(),
                        me2 = c.String(),
                        postedDate = c.String(),
                        createdDate = c.DateTime(precision: 7, storeType: "datetime2"),
                        modifiedDate = c.DateTime(precision: 7, storeType: "datetime2"),
                        softDelete = c.Boolean(),
                        recordTrackerGuid = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.thingId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.findings", "thingId", "dbo.thing");
            DropForeignKey("dbo.comments", "thing_thingId", "dbo.thing");
            DropForeignKey("dbo.comments", "findingId", "dbo.findings");
            DropIndex("dbo.findings", new[] { "thingId" });
            DropIndex("dbo.comments", new[] { "thing_thingId" });
            DropIndex("dbo.comments", new[] { "findingId" });
            DropTable("dbo.thing");
            DropTable("dbo.findings");
            DropTable("dbo.comments");
        }
    }
}
