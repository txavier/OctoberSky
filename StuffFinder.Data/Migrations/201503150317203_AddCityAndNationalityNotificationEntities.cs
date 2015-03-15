namespace StuffFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCityAndNationalityNotificationEntities : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.cityNotifications",
                c => new
                    {
                        cityNotificationId = c.Int(nullable: false, identity: true),
                        cityId = c.Int(nullable: false),
                        userName = c.String(nullable: false, maxLength: 256),
                        messageBody = c.String(nullable: false),
                        dateCreated = c.DateTime(nullable: false, precision: 7, storeType: "datetime2"),
                        dateSent = c.DateTime(precision: 7, storeType: "datetime2"),
                        dateLastModified = c.DateTime(precision: 7, storeType: "datetime2"),
                    })
                .PrimaryKey(t => t.cityNotificationId)
                .ForeignKey("dbo.city", t => t.cityId, cascadeDelete: false)
                .Index(t => t.cityId);
            
            CreateTable(
                "dbo.nationalityNotifications",
                c => new
                    {
                        nationalityNotificationId = c.Int(nullable: false, identity: true),
                        nationalityId = c.Int(nullable: false),
                        userName = c.String(nullable: false, maxLength: 256),
                        messageBody = c.String(nullable: false),
                        dateCreated = c.DateTime(nullable: false, precision: 7, storeType: "datetime2"),
                        dateSent = c.DateTime(precision: 7, storeType: "datetime2"),
                        dateLastModified = c.DateTime(precision: 7, storeType: "datetime2"),
                    })
                .PrimaryKey(t => t.nationalityNotificationId)
                .ForeignKey("dbo.nationality", t => t.nationalityId, cascadeDelete: false)
                .Index(t => t.nationalityId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.nationalityNotifications", "nationalityId", "dbo.nationality");
            DropForeignKey("dbo.cityNotifications", "cityId", "dbo.city");
            DropIndex("dbo.nationalityNotifications", new[] { "nationalityId" });
            DropIndex("dbo.cityNotifications", new[] { "cityId" });
            DropTable("dbo.nationalityNotifications");
            DropTable("dbo.cityNotifications");
        }
    }
}
