USE [master]
GO
/****** Object:  Database [StudentManagementSystem]    Script Date: 2/13/2025 8:18:29 AM ******/
CREATE DATABASE [StudentManagementSystem]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'StudentManagementSystem', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\StudentManagementSystem.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'StudentManagementSystem_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\StudentManagementSystem_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [StudentManagementSystem] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [StudentManagementSystem].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [StudentManagementSystem] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET ARITHABORT OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [StudentManagementSystem] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [StudentManagementSystem] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET  DISABLE_BROKER 
GO
ALTER DATABASE [StudentManagementSystem] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [StudentManagementSystem] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET RECOVERY FULL 
GO
ALTER DATABASE [StudentManagementSystem] SET  MULTI_USER 
GO
ALTER DATABASE [StudentManagementSystem] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [StudentManagementSystem] SET DB_CHAINING OFF 
GO
ALTER DATABASE [StudentManagementSystem] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [StudentManagementSystem] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [StudentManagementSystem] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [StudentManagementSystem] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'StudentManagementSystem', N'ON'
GO
ALTER DATABASE [StudentManagementSystem] SET QUERY_STORE = ON
GO
ALTER DATABASE [StudentManagementSystem] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [StudentManagementSystem]
GO
/****** Object:  Table [dbo].[FormTemplates]    Script Date: 2/13/2025 8:18:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FormTemplates](
	[TemplateID] [int] IDENTITY(1,1) NOT NULL,
	[TemplateName] [varchar](100) NOT NULL,
	[Description] [text] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[TemplateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FormFields]    Script Date: 2/13/2025 8:18:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FormFields](
	[FieldID] [int] IDENTITY(1,1) NOT NULL,
	[TemplateID] [int] NULL,
	[FieldName] [varchar](100) NOT NULL,
	[FieldType] [varchar](50) NOT NULL,
	[IsRequired] [bit] NULL,
	[DefaultValue] [varchar](255) NULL,
	[ValidationRules] [text] NULL,
	[DisplayOrder] [int] NULL,
	[CreatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[FieldID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FormData]    Script Date: 2/13/2025 8:18:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FormData](
	[DataID] [int] IDENTITY(1,1) NOT NULL,
	[TemplateID] [int] NULL,
	[FieldValue1] [varchar](255) NULL,
	[FieldValue2] [varchar](255) NULL,
	[FieldValue3] [varchar](255) NULL,
	[FieldValue4] [varchar](255) NULL,
	[FieldValue5] [varchar](255) NULL,
	[FieldValue6] [varchar](255) NULL,
	[FieldValue7] [varchar](255) NULL,
	[FieldValue8] [varchar](255) NULL,
	[FieldValue9] [varchar](255) NULL,
	[FieldValue10] [varchar](255) NULL,
	[FieldValue11] [varchar](255) NULL,
	[FieldValue12] [varchar](255) NULL,
	[FieldValue13] [varchar](255) NULL,
	[FieldValue14] [varchar](255) NULL,
	[FieldValue15] [varchar](255) NULL,
	[FieldValue16] [varchar](255) NULL,
	[FieldValue17] [varchar](255) NULL,
	[FieldValue18] [varchar](255) NULL,
	[FieldValue19] [varchar](255) NULL,
	[FieldValue20] [varchar](255) NULL,
	[FieldValue21] [varchar](255) NULL,
	[FieldValue22] [varchar](255) NULL,
	[FieldValue23] [varchar](255) NULL,
	[FieldValue24] [varchar](255) NULL,
	[FieldValue25] [varchar](255) NULL,
	[FieldValue26] [varchar](255) NULL,
	[FieldValue27] [varchar](255) NULL,
	[FieldValue28] [varchar](255) NULL,
	[FieldValue29] [varchar](255) NULL,
	[FieldValue30] [varchar](255) NULL,
	[FieldValue31] [varchar](255) NULL,
	[FieldValue32] [varchar](255) NULL,
	[FieldValue33] [varchar](255) NULL,
	[FieldValue34] [varchar](255) NULL,
	[FieldValue35] [varchar](255) NULL,
	[FieldValue36] [varchar](255) NULL,
	[FieldValue37] [varchar](255) NULL,
	[FieldValue38] [varchar](255) NULL,
	[FieldValue39] [varchar](255) NULL,
	[FieldValue40] [varchar](255) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[DataID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[DetailedFormView]    Script Date: 2/13/2025 8:18:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create a view to show detailed form data
CREATE VIEW [dbo].[DetailedFormView] AS
WITH NumberedFields AS (
    -- Get all form fields with their position numbers
    SELECT 
        TemplateID,
        FieldID,
        FieldName,
        FieldType,
        DisplayOrder,
        ROW_NUMBER() OVER (PARTITION BY TemplateID ORDER BY DisplayOrder, FieldID) as FieldNumber
    FROM FormFields
)
SELECT 
    fd.DataID,
    ft.TemplateID,
    ft.TemplateName,
    ft.Description as TemplateDescription,
    nf.FieldName,
    nf.FieldType,
	nf.DisplayOrder,
    CASE 
        WHEN nf.FieldNumber = 1 THEN fd.FieldValue1
        WHEN nf.FieldNumber = 2 THEN fd.FieldValue2
        WHEN nf.FieldNumber = 3 THEN fd.FieldValue3
		WHEN nf.FieldNumber = 4 THEN fd.FieldValue4
		WHEN nf.FieldNumber = 5 THEN fd.FieldValue5
		WHEN nf.FieldNumber = 6 THEN fd.FieldValue6
		WHEN nf.FieldNumber = 7 THEN fd.FieldValue7
		WHEN nf.FieldNumber = 8 THEN fd.FieldValue8
		WHEN nf.FieldNumber = 9 THEN fd.FieldValue9
		WHEN nf.FieldNumber = 10 THEN fd.FieldValue10
        WHEN nf.FieldNumber = 12 THEN fd.FieldValue12
        WHEN nf.FieldNumber = 13 THEN fd.FieldValue13
		WHEN nf.FieldNumber = 14 THEN fd.FieldValue14
		WHEN nf.FieldNumber = 15 THEN fd.FieldValue15
		WHEN nf.FieldNumber = 16 THEN fd.FieldValue16
		WHEN nf.FieldNumber = 17 THEN fd.FieldValue17
		WHEN nf.FieldNumber = 18 THEN fd.FieldValue18
		WHEN nf.FieldNumber = 19 THEN fd.FieldValue19
		WHEN nf.FieldNumber = 20 THEN fd.FieldValue20
        WHEN nf.FieldNumber = 21 THEN fd.FieldValue21
        WHEN nf.FieldNumber = 22 THEN fd.FieldValue22
        WHEN nf.FieldNumber = 23 THEN fd.FieldValue23
		WHEN nf.FieldNumber = 24 THEN fd.FieldValue24
		WHEN nf.FieldNumber = 25 THEN fd.FieldValue25
		WHEN nf.FieldNumber = 26 THEN fd.FieldValue26
		WHEN nf.FieldNumber = 27 THEN fd.FieldValue27
		WHEN nf.FieldNumber = 28 THEN fd.FieldValue28
		WHEN nf.FieldNumber = 29 THEN fd.FieldValue29
		WHEN nf.FieldNumber = 30 THEN fd.FieldValue30
        WHEN nf.FieldNumber = 31 THEN fd.FieldValue31
        WHEN nf.FieldNumber = 32 THEN fd.FieldValue32
        WHEN nf.FieldNumber = 33 THEN fd.FieldValue33
		WHEN nf.FieldNumber = 34 THEN fd.FieldValue34
		WHEN nf.FieldNumber = 35 THEN fd.FieldValue35
		WHEN nf.FieldNumber = 36 THEN fd.FieldValue36
		WHEN nf.FieldNumber = 37 THEN fd.FieldValue37
		WHEN nf.FieldNumber = 38 THEN fd.FieldValue38
		WHEN nf.FieldNumber = 39 THEN fd.FieldValue39
		WHEN nf.FieldNumber = 40 THEN fd.FieldValue40
        -- Add more cases up to FieldValue40
        ELSE NULL
    END as FieldValue,
    fd.CreatedAt as SubmissionDate,
    fd.UpdatedAt as LastUpdated
FROM FormData fd
JOIN FormTemplates ft ON fd.TemplateID = ft.TemplateID
JOIN NumberedFields nf ON ft.TemplateID = nf.TemplateID
WHERE ft.IsActive = 1
GO
/****** Object:  Table [dbo].[Admins]    Script Date: 2/13/2025 8:18:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admins](
	[AdminID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Password] [varchar](255) NOT NULL,
	[ContactNumber] [varchar](20) NULL,
	[LastLogin] [datetime] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[AdminID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AttendanceRecords]    Script Date: 2/13/2025 8:18:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AttendanceRecords](
	[AttendanceID] [int] IDENTITY(1,1) NOT NULL,
	[StudentID] [int] NULL,
	[Date] [date] NOT NULL,
	[IsPresent] [bit] NOT NULL,
	[Remarks] [varchar](255) NULL,
	[CreatedBy] [int] NULL,
	[CreatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[AttendanceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departments]    Script Date: 2/13/2025 8:18:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departments](
	[DepartmentID] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [varchar](100) NOT NULL,
	[CreatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[DepartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[DepartmentName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Students]    Script Date: 2/13/2025 8:18:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Students](
	[StudentID] [int] IDENTITY(1,1) NOT NULL,
	[RegistrationNumber] [varchar](20) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[FathersName] [varchar](100) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Password] [varchar](255) NOT NULL,
	[Gender] [varchar](10) NOT NULL,
	[DateOfBirth] [date] NOT NULL,
	[Address] [text] NOT NULL,
	[PhoneNumber] [varchar](20) NOT NULL,
	[DepartmentID] [int] NULL,
	[BatchYear] [int] NOT NULL,
	[CurrentSemester] [int] NOT NULL,
	[Shift] [varchar](10) NOT NULL,
	[ProfilePicture] [varchar](255) NULL,
	[Attendance] [decimal](5, 2) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[StudentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[RegistrationNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserTypes]    Script Date: 2/13/2025 8:18:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserTypes](
	[TypeID] [int] IDENTITY(1,1) NOT NULL,
	[TypeName] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[TypeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Admins] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Admins] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Admins] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[AttendanceRecords] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Departments] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[FormData] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[FormData] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[FormFields] ADD  DEFAULT ((0)) FOR [IsRequired]
GO
ALTER TABLE [dbo].[FormFields] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[FormTemplates] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[FormTemplates] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[FormTemplates] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Students] ADD  DEFAULT ((0.00)) FOR [Attendance]
GO
ALTER TABLE [dbo].[Students] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Students] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Students] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[AttendanceRecords]  WITH CHECK ADD FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Admins] ([AdminID])
GO
ALTER TABLE [dbo].[AttendanceRecords]  WITH CHECK ADD FOREIGN KEY([StudentID])
REFERENCES [dbo].[Students] ([StudentID])
GO
ALTER TABLE [dbo].[FormData]  WITH CHECK ADD FOREIGN KEY([TemplateID])
REFERENCES [dbo].[FormTemplates] ([TemplateID])
GO
ALTER TABLE [dbo].[FormFields]  WITH CHECK ADD FOREIGN KEY([TemplateID])
REFERENCES [dbo].[FormTemplates] ([TemplateID])
GO
ALTER TABLE [dbo].[Students]  WITH CHECK ADD FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Departments] ([DepartmentID])
GO
ALTER TABLE [dbo].[Students]  WITH CHECK ADD CHECK  (([CurrentSemester]>=(1) AND [CurrentSemester]<=(8)))
GO
ALTER TABLE [dbo].[Students]  WITH CHECK ADD CHECK  (([Gender]='Other' OR [Gender]='Female' OR [Gender]='Male'))
GO
ALTER TABLE [dbo].[Students]  WITH CHECK ADD CHECK  (([Shift]='Day' OR [Shift]='Morning'))
GO
/****** Object:  StoredProcedure [dbo].[GetFormDataPivot]    Script Date: 2/13/2025 8:18:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetFormDataPivot] 
    @TemplateID INT = NULL  -- Optional parameter to filter by template
AS
BEGIN
    -- First, get the list of field names for the PIVOT columns
    DECLARE @columns NVARCHAR(MAX);
    DECLARE @sql NVARCHAR(MAX);

    SELECT @columns = STRING_AGG(QUOTENAME(FieldName), ',')
    FROM FormFields 
    WHERE TemplateID = ISNULL(@TemplateID, TemplateID);

    -- Build the dynamic SQL
    SET @sql = N'
    WITH NumberedFields AS (
        SELECT 
            TemplateID,
            FieldID,
            FieldName,
            ROW_NUMBER() OVER (PARTITION BY TemplateID ORDER BY DisplayOrder, FieldID) as FieldNumber
        FROM FormFields
    ),
    UnpivotedData AS (
        SELECT 
            fd.DataID,
            fd.TemplateID,
            ft.TemplateName,
            nf.FieldName,
            CASE 
                WHEN nf.FieldNumber = 1 THEN fd.FieldValue1
				WHEN nf.FieldNumber = 2 THEN fd.FieldValue2
				WHEN nf.FieldNumber = 3 THEN fd.FieldValue3
				WHEN nf.FieldNumber = 4 THEN fd.FieldValue4
				WHEN nf.FieldNumber = 5 THEN fd.FieldValue5
				WHEN nf.FieldNumber = 6 THEN fd.FieldValue6
				WHEN nf.FieldNumber = 7 THEN fd.FieldValue7
				WHEN nf.FieldNumber = 8 THEN fd.FieldValue8
				WHEN nf.FieldNumber = 9 THEN fd.FieldValue9
				WHEN nf.FieldNumber = 10 THEN fd.FieldValue10
				WHEN nf.FieldNumber = 12 THEN fd.FieldValue12
				WHEN nf.FieldNumber = 13 THEN fd.FieldValue13
				WHEN nf.FieldNumber = 14 THEN fd.FieldValue14
				WHEN nf.FieldNumber = 15 THEN fd.FieldValue15
				WHEN nf.FieldNumber = 16 THEN fd.FieldValue16
				WHEN nf.FieldNumber = 17 THEN fd.FieldValue17
				WHEN nf.FieldNumber = 18 THEN fd.FieldValue18
				WHEN nf.FieldNumber = 19 THEN fd.FieldValue19
				WHEN nf.FieldNumber = 20 THEN fd.FieldValue20
				WHEN nf.FieldNumber = 21 THEN fd.FieldValue21
				WHEN nf.FieldNumber = 22 THEN fd.FieldValue22
				WHEN nf.FieldNumber = 23 THEN fd.FieldValue23
				WHEN nf.FieldNumber = 24 THEN fd.FieldValue24
				WHEN nf.FieldNumber = 25 THEN fd.FieldValue25
				WHEN nf.FieldNumber = 26 THEN fd.FieldValue26
				WHEN nf.FieldNumber = 27 THEN fd.FieldValue27
				WHEN nf.FieldNumber = 28 THEN fd.FieldValue28
				WHEN nf.FieldNumber = 29 THEN fd.FieldValue29
				WHEN nf.FieldNumber = 30 THEN fd.FieldValue30
				WHEN nf.FieldNumber = 31 THEN fd.FieldValue31
				WHEN nf.FieldNumber = 32 THEN fd.FieldValue32
				WHEN nf.FieldNumber = 33 THEN fd.FieldValue33
				WHEN nf.FieldNumber = 34 THEN fd.FieldValue34
				WHEN nf.FieldNumber = 35 THEN fd.FieldValue35
				WHEN nf.FieldNumber = 36 THEN fd.FieldValue36
				WHEN nf.FieldNumber = 37 THEN fd.FieldValue37
				WHEN nf.FieldNumber = 38 THEN fd.FieldValue38
				WHEN nf.FieldNumber = 39 THEN fd.FieldValue39
				WHEN nf.FieldNumber = 40 THEN fd.FieldValue40
            END as FieldValue,
            fd.CreatedAt,
            fd.UpdatedAt
        FROM FormData fd
        JOIN FormTemplates ft ON fd.TemplateID = ft.TemplateID
        JOIN NumberedFields nf ON ft.TemplateID = nf.TemplateID
        WHERE ft.IsActive = 1
        AND fd.TemplateID = ISNULL(@TemplateID, fd.TemplateID)
    )
    SELECT 
        DataID,
        TemplateID,
        TemplateName,
        CreatedAt,
        UpdatedAt,
        ' + @columns + '
    FROM UnpivotedData
    PIVOT (
        MAX(FieldValue)
        FOR FieldName IN (' + @columns + ')
    ) AS PivotTable
    ORDER BY DataID;'

    -- Execute the dynamic SQL
    EXEC sp_executesql @sql, N'@TemplateID INT', @TemplateID;
END
GO
USE [master]
GO
ALTER DATABASE [StudentManagementSystem] SET  READ_WRITE 
GO
