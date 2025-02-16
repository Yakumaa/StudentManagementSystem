USE [master]
GO
/****** Object:  Database [StudentManagementSystem]    Script Date: 2/17/2025 11:58:29 AM ******/
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
/****** Object:  Table [dbo].[FormTemplates]    Script Date: 2/17/2025 11:58:29 AM ******/
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
/****** Object:  Table [dbo].[FormFields]    Script Date: 2/17/2025 11:58:29 AM ******/
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
/****** Object:  Table [dbo].[FormData]    Script Date: 2/17/2025 11:58:29 AM ******/
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
	[isActive] [bit] NULL,
	[FormID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[DataID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[DetailedFormView]    Script Date: 2/17/2025 11:58:29 AM ******/
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
/****** Object:  Table [dbo].[Admins]    Script Date: 2/17/2025 11:58:29 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AttendanceRecords]    Script Date: 2/17/2025 11:58:29 AM ******/
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
/****** Object:  Table [dbo].[Departments]    Script Date: 2/17/2025 11:58:29 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Form]    Script Date: 2/17/2025 11:58:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Form](
	[FormID] [int] IDENTITY(1,1) NOT NULL,
	[TemplateID] [int] NULL,
	[submittedAt] [datetime] NULL,
	[submittedBy] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[FormID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Students]    Script Date: 2/17/2025 11:58:29 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2/17/2025 11:58:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[userID] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[email] [varchar](255) NOT NULL,
	[passwordHash] [varchar](255) NOT NULL,
	[userTypeID] [int] NOT NULL,
	[createdAt] [datetime] NULL,
	[updatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[userID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserTypes]    Script Date: 2/17/2025 11:58:29 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Admins] ON 

INSERT [dbo].[Admins] ([AdminID], [Name], [Email], [Password], [ContactNumber], [LastLogin], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (1, N'admin', N'admin@admin.com', N'1234', N'1234567890', NULL, CAST(N'2025-02-07T12:21:49.780' AS DateTime), CAST(N'2025-02-07T12:21:49.780' AS DateTime), 1)
INSERT [dbo].[Admins] ([AdminID], [Name], [Email], [Password], [ContactNumber], [LastLogin], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (3, N'admin2', N'admin2@admin.com', N'1234', N'2234567890', NULL, CAST(N'2025-02-10T10:44:51.730' AS DateTime), CAST(N'2025-02-10T10:44:51.730' AS DateTime), 1)
INSERT [dbo].[Admins] ([AdminID], [Name], [Email], [Password], [ContactNumber], [LastLogin], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (4, N'admin3', N'admin3@admin.com', N'$2b$10$LLvRAg/laoXi3pc8WRAJL.ZHrvzr3U5xfqP4GnJnCvYw/s.Gn2lb2', N'3234567890', NULL, CAST(N'2025-02-10T14:21:50.693' AS DateTime), CAST(N'2025-02-10T14:21:50.693' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Admins] OFF
GO
SET IDENTITY_INSERT [dbo].[AttendanceRecords] ON 

INSERT [dbo].[AttendanceRecords] ([AttendanceID], [StudentID], [Date], [IsPresent], [Remarks], [CreatedBy], [CreatedAt]) VALUES (1, 1, CAST(N'2025-01-10' AS Date), 1, N'Good', NULL, CAST(N'2025-02-10T11:02:01.370' AS DateTime))
SET IDENTITY_INSERT [dbo].[AttendanceRecords] OFF
GO
SET IDENTITY_INSERT [dbo].[Departments] ON 

INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [CreatedAt]) VALUES (1, N'CSIT', CAST(N'2025-02-07T12:21:49.783' AS DateTime))
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [CreatedAt]) VALUES (2, N'BCA', CAST(N'2025-02-07T12:21:49.783' AS DateTime))
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [CreatedAt]) VALUES (3, N'BIT', CAST(N'2025-02-07T12:21:49.783' AS DateTime))
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [CreatedAt]) VALUES (4, N'BBA', CAST(N'2025-02-07T12:21:49.783' AS DateTime))
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [CreatedAt]) VALUES (5, N'BIM', CAST(N'2025-02-07T12:21:49.783' AS DateTime))
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [CreatedAt]) VALUES (6, N'BBS', CAST(N'2025-02-07T12:21:49.783' AS DateTime))
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [CreatedAt]) VALUES (7, N'Computer Engineering', CAST(N'2025-02-07T12:21:49.783' AS DateTime))
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [CreatedAt]) VALUES (8, N'Electronics Engineering', CAST(N'2025-02-07T12:21:49.783' AS DateTime))
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [CreatedAt]) VALUES (9, N'Mechanical Engineering', CAST(N'2025-02-07T12:21:49.783' AS DateTime))
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [CreatedAt]) VALUES (10, N'Civil Engineering', CAST(N'2025-02-07T12:21:49.783' AS DateTime))
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [CreatedAt]) VALUES (11, N'Architect', CAST(N'2025-02-10T10:56:01.487' AS DateTime))
SET IDENTITY_INSERT [dbo].[Departments] OFF
GO
SET IDENTITY_INSERT [dbo].[Form] ON 

INSERT [dbo].[Form] ([FormID], [TemplateID], [submittedAt], [submittedBy]) VALUES (5, 1, CAST(N'2025-02-13T16:14:53.937' AS DateTime), NULL)
INSERT [dbo].[Form] ([FormID], [TemplateID], [submittedAt], [submittedBy]) VALUES (18, 1, CAST(N'2025-02-13T16:55:48.720' AS DateTime), NULL)
INSERT [dbo].[Form] ([FormID], [TemplateID], [submittedAt], [submittedBy]) VALUES (19, 1, CAST(N'2025-02-13T16:57:18.427' AS DateTime), NULL)
INSERT [dbo].[Form] ([FormID], [TemplateID], [submittedAt], [submittedBy]) VALUES (20, 1, CAST(N'2025-02-13T17:01:54.380' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Form] OFF
GO
SET IDENTITY_INSERT [dbo].[FormData] ON 

INSERT [dbo].[FormData] ([DataID], [TemplateID], [FieldValue1], [FieldValue2], [FieldValue3], [FieldValue4], [FieldValue5], [FieldValue6], [FieldValue7], [FieldValue8], [FieldValue9], [FieldValue10], [FieldValue11], [FieldValue12], [FieldValue13], [FieldValue14], [FieldValue15], [FieldValue16], [FieldValue17], [FieldValue18], [FieldValue19], [FieldValue20], [FieldValue21], [FieldValue22], [FieldValue23], [FieldValue24], [FieldValue25], [FieldValue26], [FieldValue27], [FieldValue28], [FieldValue29], [FieldValue30], [FieldValue31], [FieldValue32], [FieldValue33], [FieldValue34], [FieldValue35], [FieldValue36], [FieldValue37], [FieldValue38], [FieldValue39], [FieldValue40], [CreatedAt], [UpdatedAt], [isActive], [FormID]) VALUES (1, 1, N'REG2025005', N'edit', N'edit', N'edit', N'edit@gmail.com', N'Male', N'2025-01-26', N'edit diet', N'9808279858', N'7', N'2025', N'6', N'Day', NULL, N'0.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2025-02-12T12:32:38.257' AS DateTime), CAST(N'2025-02-12T12:32:38.257' AS DateTime), 1, NULL)
INSERT [dbo].[FormData] ([DataID], [TemplateID], [FieldValue1], [FieldValue2], [FieldValue3], [FieldValue4], [FieldValue5], [FieldValue6], [FieldValue7], [FieldValue8], [FieldValue9], [FieldValue10], [FieldValue11], [FieldValue12], [FieldValue13], [FieldValue14], [FieldValue15], [FieldValue16], [FieldValue17], [FieldValue18], [FieldValue19], [FieldValue20], [FieldValue21], [FieldValue22], [FieldValue23], [FieldValue24], [FieldValue25], [FieldValue26], [FieldValue27], [FieldValue28], [FieldValue29], [FieldValue30], [FieldValue31], [FieldValue32], [FieldValue33], [FieldValue34], [FieldValue35], [FieldValue36], [FieldValue37], [FieldValue38], [FieldValue39], [FieldValue40], [CreatedAt], [UpdatedAt], [isActive], [FormID]) VALUES (18, 1, N'REG2025003', N'test', N'test', N'test Doe', N'tester@example.com', N'Female', N'2000-01-01', N'13 Main St, City, Country', N'6234567890', N'5', N'2024', N'6', N'Morning', N'path/to/profile_picture.jpg', N'70', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2025-02-12T23:12:53.700' AS DateTime), CAST(N'2025-02-12T23:12:53.700' AS DateTime), 1, NULL)
INSERT [dbo].[FormData] ([DataID], [TemplateID], [FieldValue1], [FieldValue2], [FieldValue3], [FieldValue4], [FieldValue5], [FieldValue6], [FieldValue7], [FieldValue8], [FieldValue9], [FieldValue10], [FieldValue11], [FieldValue12], [FieldValue13], [FieldValue14], [FieldValue15], [FieldValue16], [FieldValue17], [FieldValue18], [FieldValue19], [FieldValue20], [FieldValue21], [FieldValue22], [FieldValue23], [FieldValue24], [FieldValue25], [FieldValue26], [FieldValue27], [FieldValue28], [FieldValue29], [FieldValue30], [FieldValue31], [FieldValue32], [FieldValue33], [FieldValue34], [FieldValue35], [FieldValue36], [FieldValue37], [FieldValue38], [FieldValue39], [FieldValue40], [CreatedAt], [UpdatedAt], [isActive], [FormID]) VALUES (19, 1, N'REG2025005', N'testfromlaptop', N'test', N'test Doe', N'laptop@example.com', N'Male', N'2002-01-01', N'kathmandu', N'6234567890', N'2', N'2024', N'4', N'Morning', N'path/to/profile_picture.jpg', N'80', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2025-02-13T08:33:51.120' AS DateTime), CAST(N'2025-02-13T08:33:51.120' AS DateTime), 1, NULL)
INSERT [dbo].[FormData] ([DataID], [TemplateID], [FieldValue1], [FieldValue2], [FieldValue3], [FieldValue4], [FieldValue5], [FieldValue6], [FieldValue7], [FieldValue8], [FieldValue9], [FieldValue10], [FieldValue11], [FieldValue12], [FieldValue13], [FieldValue14], [FieldValue15], [FieldValue16], [FieldValue17], [FieldValue18], [FieldValue19], [FieldValue20], [FieldValue21], [FieldValue22], [FieldValue23], [FieldValue24], [FieldValue25], [FieldValue26], [FieldValue27], [FieldValue28], [FieldValue29], [FieldValue30], [FieldValue31], [FieldValue32], [FieldValue33], [FieldValue34], [FieldValue35], [FieldValue36], [FieldValue37], [FieldValue38], [FieldValue39], [FieldValue40], [CreatedAt], [UpdatedAt], [isActive], [FormID]) VALUES (20, 1, N'REG2025240', N'Shirish', N'Maharjan', N'dsfsdfdsf', N'admin3@admin.com', N'Male', N'2025-01-26', N'Bhatbhateni', N'9808279858', N'11', N'2025', N'5', N'Morning', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2025-02-13T10:55:21.847' AS DateTime), CAST(N'2025-02-13T10:55:21.847' AS DateTime), 1, NULL)
INSERT [dbo].[FormData] ([DataID], [TemplateID], [FieldValue1], [FieldValue2], [FieldValue3], [FieldValue4], [FieldValue5], [FieldValue6], [FieldValue7], [FieldValue8], [FieldValue9], [FieldValue10], [FieldValue11], [FieldValue12], [FieldValue13], [FieldValue14], [FieldValue15], [FieldValue16], [FieldValue17], [FieldValue18], [FieldValue19], [FieldValue20], [FieldValue21], [FieldValue22], [FieldValue23], [FieldValue24], [FieldValue25], [FieldValue26], [FieldValue27], [FieldValue28], [FieldValue29], [FieldValue30], [FieldValue31], [FieldValue32], [FieldValue33], [FieldValue34], [FieldValue35], [FieldValue36], [FieldValue37], [FieldValue38], [FieldValue39], [FieldValue40], [CreatedAt], [UpdatedAt], [isActive], [FormID]) VALUES (22, 1, N'REG2025188', N'testing', N'Maharjan', N'dsfsdfdsf', N'admin3@admin.com', N'Male', N'2025-01-26', N'Bhatbhateni', N'9808279858', N'11', N'2025', N'4', N'Day', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2025-02-13T12:25:45.540' AS DateTime), CAST(N'2025-02-13T12:25:45.540' AS DateTime), 1, NULL)
INSERT [dbo].[FormData] ([DataID], [TemplateID], [FieldValue1], [FieldValue2], [FieldValue3], [FieldValue4], [FieldValue5], [FieldValue6], [FieldValue7], [FieldValue8], [FieldValue9], [FieldValue10], [FieldValue11], [FieldValue12], [FieldValue13], [FieldValue14], [FieldValue15], [FieldValue16], [FieldValue17], [FieldValue18], [FieldValue19], [FieldValue20], [FieldValue21], [FieldValue22], [FieldValue23], [FieldValue24], [FieldValue25], [FieldValue26], [FieldValue27], [FieldValue28], [FieldValue29], [FieldValue30], [FieldValue31], [FieldValue32], [FieldValue33], [FieldValue34], [FieldValue35], [FieldValue36], [FieldValue37], [FieldValue38], [FieldValue39], [FieldValue40], [CreatedAt], [UpdatedAt], [isActive], [FormID]) VALUES (23, 1, N'REG2025994', N'Shirish', N'Maharjan', N'dsfsdfdsf', N'admin3@admin.com', N'Male', N'2025-02-01', N'Bhatbhateni', N'9808279858', N'8', N'2025', N'2', N'Day', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2025-02-13T14:02:57.807' AS DateTime), CAST(N'2025-02-13T14:02:57.807' AS DateTime), 1, NULL)
INSERT [dbo].[FormData] ([DataID], [TemplateID], [FieldValue1], [FieldValue2], [FieldValue3], [FieldValue4], [FieldValue5], [FieldValue6], [FieldValue7], [FieldValue8], [FieldValue9], [FieldValue10], [FieldValue11], [FieldValue12], [FieldValue13], [FieldValue14], [FieldValue15], [FieldValue16], [FieldValue17], [FieldValue18], [FieldValue19], [FieldValue20], [FieldValue21], [FieldValue22], [FieldValue23], [FieldValue24], [FieldValue25], [FieldValue26], [FieldValue27], [FieldValue28], [FieldValue29], [FieldValue30], [FieldValue31], [FieldValue32], [FieldValue33], [FieldValue34], [FieldValue35], [FieldValue36], [FieldValue37], [FieldValue38], [FieldValue39], [FieldValue40], [CreatedAt], [UpdatedAt], [isActive], [FormID]) VALUES (24, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2025-02-13T16:55:48.800' AS DateTime), CAST(N'2025-02-13T16:55:48.800' AS DateTime), 0, 5)
INSERT [dbo].[FormData] ([DataID], [TemplateID], [FieldValue1], [FieldValue2], [FieldValue3], [FieldValue4], [FieldValue5], [FieldValue6], [FieldValue7], [FieldValue8], [FieldValue9], [FieldValue10], [FieldValue11], [FieldValue12], [FieldValue13], [FieldValue14], [FieldValue15], [FieldValue16], [FieldValue17], [FieldValue18], [FieldValue19], [FieldValue20], [FieldValue21], [FieldValue22], [FieldValue23], [FieldValue24], [FieldValue25], [FieldValue26], [FieldValue27], [FieldValue28], [FieldValue29], [FieldValue30], [FieldValue31], [FieldValue32], [FieldValue33], [FieldValue34], [FieldValue35], [FieldValue36], [FieldValue37], [FieldValue38], [FieldValue39], [FieldValue40], [CreatedAt], [UpdatedAt], [isActive], [FormID]) VALUES (25, 1, N'REG2025005', N'testfromlaptop', N'test', N'test Doe', N'laptop@example.com', N'Male', N'2002-01-01', N'kathmandu', N'6234567890', N'2', N'2024', N'4', N'Morning', N'path/to/profile_picture.jpg', N'80', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2025-02-13T16:57:18.473' AS DateTime), CAST(N'2025-02-13T16:57:18.473' AS DateTime), 1, 19)
INSERT [dbo].[FormData] ([DataID], [TemplateID], [FieldValue1], [FieldValue2], [FieldValue3], [FieldValue4], [FieldValue5], [FieldValue6], [FieldValue7], [FieldValue8], [FieldValue9], [FieldValue10], [FieldValue11], [FieldValue12], [FieldValue13], [FieldValue14], [FieldValue15], [FieldValue16], [FieldValue17], [FieldValue18], [FieldValue19], [FieldValue20], [FieldValue21], [FieldValue22], [FieldValue23], [FieldValue24], [FieldValue25], [FieldValue26], [FieldValue27], [FieldValue28], [FieldValue29], [FieldValue30], [FieldValue31], [FieldValue32], [FieldValue33], [FieldValue34], [FieldValue35], [FieldValue36], [FieldValue37], [FieldValue38], [FieldValue39], [FieldValue40], [CreatedAt], [UpdatedAt], [isActive], [FormID]) VALUES (26, 1, N'REG2025398', N'nrw', N'Maharjan', N'wqwq', N'admin3@admin.com', N'Male', N'2025-01-26', N'Bhatbhateni', N'9808279858', N'8', N'2025', N'3', N'Morning', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2025-02-13T17:01:54.410' AS DateTime), CAST(N'2025-02-13T17:01:54.410' AS DateTime), 1, 20)
SET IDENTITY_INSERT [dbo].[FormData] OFF
GO
SET IDENTITY_INSERT [dbo].[FormFields] ON 

INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (1, 1, N'RegistrationNumber', N'text', 1, NULL, N'{"maxLength": 20, "unique": true}', 10, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (2, 1, N'FirstName', N'text', 1, NULL, N'{"maxLength": 50, "minLength": 2}', 20, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (3, 1, N'LastName', N'text', 1, NULL, N'{"maxLength": 50, "minLength": 2}', 30, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (4, 1, N'FathersName', N'text', 1, NULL, N'{"maxLength": 100, "minLength": 2}', 40, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (5, 1, N'Email', N'email', 1, NULL, N'{"maxLength": 100, "unique": true, "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}', 50, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (6, 1, N'Gender', N'select', 1, NULL, N'{"options": ["Male", "Female", "Other"]}', 60, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (7, 1, N'DateOfBirth', N'date', 1, NULL, N'{"max": "2010-12-31"}', 70, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (8, 1, N'Address', N'textarea', 1, NULL, N'{"minLength": 10, "maxLength": 500}', 80, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (9, 1, N'PhoneNumber', N'text', 1, NULL, N'{"maxLength": 20, "pattern": "^[0-9+-]+$"}', 90, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (10, 1, N'DepartmentID', N'select', 1, NULL, N'{"fetchFrom": "Departments", "valueField": "DepartmentID", "displayField": "DepartmentName"}', 100, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (11, 1, N'BatchYear', N'number', 1, NULL, N'{"min": 2000, "max": 2030}', 110, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (12, 1, N'CurrentSemester', N'number', 1, NULL, N'{"min": 1, "max": 8}', 120, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (13, 1, N'Shift', N'select', 1, N'Morning', N'{"options": ["Morning", "Day"]}', 130, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (14, 1, N'ProfilePicture', N'file', 0, NULL, N'{"accept": "image/*", "maxSize": 5242880}', 140, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (15, 1, N'Attendance', N'number', 0, N'0.00', N'{"min": 0, "max": 100, "step": 0.01}', 150, CAST(N'2025-02-11T15:59:04.320' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (16, 2, N'Username', N'text', 1, NULL, N'{"maxLength": 50, "minLength": 2}', 10, CAST(N'2025-02-13T11:31:33.223' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (17, 2, N'AdminEmail', N'email', 1, NULL, N'{"maxLength": 100, "unique": true, "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}', 20, CAST(N'2025-02-13T11:31:33.223' AS DateTime))
INSERT [dbo].[FormFields] ([FieldID], [TemplateID], [FieldName], [FieldType], [IsRequired], [DefaultValue], [ValidationRules], [DisplayOrder], [CreatedAt]) VALUES (18, 2, N'ContactNumber', N'text', 1, NULL, N'{"maxLength": 20, "pattern": "^[0-9+-]+$"}', 90, CAST(N'2025-02-13T11:31:33.223' AS DateTime))
SET IDENTITY_INSERT [dbo].[FormFields] OFF
GO
SET IDENTITY_INSERT [dbo].[FormTemplates] ON 

INSERT [dbo].[FormTemplates] ([TemplateID], [TemplateName], [Description], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (1, N'Student Information', N'Complete student personal details', CAST(N'2025-02-11T15:59:04.320' AS DateTime), CAST(N'2025-02-11T15:59:04.320' AS DateTime), 1)
INSERT [dbo].[FormTemplates] ([TemplateID], [TemplateName], [Description], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (2, N'Admin Information', N'Admin details', CAST(N'2025-02-13T11:20:22.913' AS DateTime), CAST(N'2025-02-13T11:20:22.913' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[FormTemplates] OFF
GO
SET IDENTITY_INSERT [dbo].[Students] ON 

INSERT [dbo].[Students] ([StudentID], [RegistrationNumber], [FirstName], [LastName], [FathersName], [Email], [Password], [Gender], [DateOfBirth], [Address], [PhoneNumber], [DepartmentID], [BatchYear], [CurrentSemester], [Shift], [ProfilePicture], [Attendance], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (1, N'REG2025001', N'John', N'Doe', N'Richard Doe', N'johndoe@example.com', N'hashed_password_here', N'Male', CAST(N'2000-01-01' AS Date), N'123 Main St, City, Country', N'1234567890', 1, 2023, 3, N'Morning', N'path/to/profile_picture.jpg', CAST(90.50 AS Decimal(5, 2)), CAST(N'2025-02-09T18:57:04.910' AS DateTime), CAST(N'2025-02-09T18:57:04.910' AS DateTime), 1)
INSERT [dbo].[Students] ([StudentID], [RegistrationNumber], [FirstName], [LastName], [FathersName], [Email], [Password], [Gender], [DateOfBirth], [Address], [PhoneNumber], [DepartmentID], [BatchYear], [CurrentSemester], [Shift], [ProfilePicture], [Attendance], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (57, N'REG2025002', N'roshan', N'shrestha', N'ram shrestha', N'roshan@example.com', N'1234', N'Male', CAST(N'2025-02-09' AS Date), N'Khusibun, Kathmandu', N'1111111111', 2, 2022, 8, N'Morning', N'path/to/profile_picture.jpg', CAST(60.00 AS Decimal(5, 2)), CAST(N'2025-02-10T09:23:02.470' AS DateTime), CAST(N'2025-02-10T09:23:02.470' AS DateTime), 1)
INSERT [dbo].[Students] ([StudentID], [RegistrationNumber], [FirstName], [LastName], [FathersName], [Email], [Password], [Gender], [DateOfBirth], [Address], [PhoneNumber], [DepartmentID], [BatchYear], [CurrentSemester], [Shift], [ProfilePicture], [Attendance], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (58, N'REG2025003', N'test', N'test', N'test Doe', N'test@example.com', N'$2b$10$nYA/FT5lgEND2SZ7Jl0GHuiRkqYl7oaGphQCyLTRHbaYwGjUKqLgS', N'Male', CAST(N'2000-01-01' AS Date), N'13 Main St, City, Country', N'6234567890', 5, 2024, 6, N'Morning', N'path/to/profile_picture.jpg', CAST(70.00 AS Decimal(5, 2)), CAST(N'2025-02-10T17:18:31.163' AS DateTime), CAST(N'2025-02-10T17:18:31.163' AS DateTime), 1)
INSERT [dbo].[Students] ([StudentID], [RegistrationNumber], [FirstName], [LastName], [FathersName], [Email], [Password], [Gender], [DateOfBirth], [Address], [PhoneNumber], [DepartmentID], [BatchYear], [CurrentSemester], [Shift], [ProfilePicture], [Attendance], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (59, N'REG2025033', N'Shirish', N'Maharjan', N'dsfsdfdsf', N'maharjanshrish8@gmail.com', N'$2b$10$fCPEY5u6MmGPjZRtM0UNg.HyBfTENWmbhewHfHHtliXHZhXgqYfF6', N'Male', CAST(N'2025-01-29' AS Date), N'Bhatbhateni', N'9808279858', 1, 2025, 6, N'Morning', NULL, CAST(100.00 AS Decimal(5, 2)), CAST(N'2025-02-10T17:58:45.350' AS DateTime), CAST(N'2025-02-10T17:58:45.350' AS DateTime), 1)
INSERT [dbo].[Students] ([StudentID], [RegistrationNumber], [FirstName], [LastName], [FathersName], [Email], [Password], [Gender], [DateOfBirth], [Address], [PhoneNumber], [DepartmentID], [BatchYear], [CurrentSemester], [Shift], [ProfilePicture], [Attendance], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (60, N'REG2025776', N'testing', N'testet', N'testestest', N'admin4@admin.com', N'$2b$10$.bWqW.DvTKyjFbahaxI6iObLULvOFKW0AldbFTzcdi613e2Pm/CVe', N'Male', CAST(N'2025-01-26' AS Date), N'qweqwe', N'9808279858', 6, 2025, 1, N'Day', NULL, CAST(100.00 AS Decimal(5, 2)), CAST(N'2025-02-11T14:09:20.747' AS DateTime), CAST(N'2025-02-11T14:09:20.747' AS DateTime), 1)
INSERT [dbo].[Students] ([StudentID], [RegistrationNumber], [FirstName], [LastName], [FathersName], [Email], [Password], [Gender], [DateOfBirth], [Address], [PhoneNumber], [DepartmentID], [BatchYear], [CurrentSemester], [Shift], [ProfilePicture], [Attendance], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (61, N'REG2025623', N'testinggg', N'testetggg', N'testestestggg', N'admiggggn4@admin.com', N'$2b$10$iiDBi6eNQEu/EeaRDOlNnu7L8oVHKNht.wUrOzMSQ4arPScrrXMOu', N'Male', CAST(N'2025-02-10' AS Date), N'qweqwe', N'9808279858', 6, 2025, 2, N'Day', NULL, CAST(100.00 AS Decimal(5, 2)), CAST(N'2025-02-11T14:13:07.413' AS DateTime), CAST(N'2025-02-11T14:13:07.413' AS DateTime), 1)
INSERT [dbo].[Students] ([StudentID], [RegistrationNumber], [FirstName], [LastName], [FathersName], [Email], [Password], [Gender], [DateOfBirth], [Address], [PhoneNumber], [DepartmentID], [BatchYear], [CurrentSemester], [Shift], [ProfilePicture], [Attendance], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (62, N'REG2025795', N'Shirish', N'Maharjan', N'dsfsdfdsf', N'admin11@admin.com', N'$2b$10$00taZFEc6BWDK/9BV0z6AOjaXQcvHUUaDofkKLxKtIa0yCQiw62iG', N'Male', CAST(N'2025-02-01' AS Date), N'Bhatbhateni', N'9808279858', 6, 2025, 2, N'Morning', NULL, CAST(100.00 AS Decimal(5, 2)), CAST(N'2025-02-11T14:16:20.330' AS DateTime), CAST(N'2025-02-11T14:16:20.330' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Students] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([userID], [username], [email], [passwordHash], [userTypeID], [createdAt], [updatedAt]) VALUES (3, N'admintest', N'user@example.com', N'1234', 1, CAST(N'2025-02-14T18:04:34.780' AS DateTime), CAST(N'2025-02-14T18:04:34.780' AS DateTime))
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET IDENTITY_INSERT [dbo].[UserTypes] ON 

INSERT [dbo].[UserTypes] ([TypeID], [TypeName]) VALUES (1, N'admin')
INSERT [dbo].[UserTypes] ([TypeID], [TypeName]) VALUES (2, N'student')
SET IDENTITY_INSERT [dbo].[UserTypes] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Admins__A9D105346E907B99]    Script Date: 2/17/2025 11:58:29 AM ******/
ALTER TABLE [dbo].[Admins] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Departme__D949CC34C1E79508]    Script Date: 2/17/2025 11:58:29 AM ******/
ALTER TABLE [dbo].[Departments] ADD UNIQUE NONCLUSTERED 
(
	[DepartmentName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Students__A9D1053472364442]    Script Date: 2/17/2025 11:58:29 AM ******/
ALTER TABLE [dbo].[Students] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Students__E88646024BCED36E]    Script Date: 2/17/2025 11:58:29 AM ******/
ALTER TABLE [dbo].[Students] ADD UNIQUE NONCLUSTERED 
(
	[RegistrationNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__AB6E61644A4965B4]    Script Date: 2/17/2025 11:58:29 AM ******/
ALTER TABLE [dbo].[Users] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__UserType__D4E7DFA8F4475079]    Script Date: 2/17/2025 11:58:29 AM ******/
ALTER TABLE [dbo].[UserTypes] ADD UNIQUE NONCLUSTERED 
(
	[TypeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
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
ALTER TABLE [dbo].[Form] ADD  DEFAULT (getdate()) FOR [submittedAt]
GO
ALTER TABLE [dbo].[FormData] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[FormData] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[FormData] ADD  DEFAULT ((1)) FOR [isActive]
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
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[AttendanceRecords]  WITH CHECK ADD FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Admins] ([AdminID])
GO
ALTER TABLE [dbo].[AttendanceRecords]  WITH CHECK ADD FOREIGN KEY([StudentID])
REFERENCES [dbo].[Students] ([StudentID])
GO
ALTER TABLE [dbo].[Form]  WITH CHECK ADD FOREIGN KEY([TemplateID])
REFERENCES [dbo].[FormTemplates] ([TemplateID])
GO
ALTER TABLE [dbo].[Form]  WITH CHECK ADD  CONSTRAINT [FK_Form_Users] FOREIGN KEY([submittedBy])
REFERENCES [dbo].[Users] ([userID])
GO
ALTER TABLE [dbo].[Form] CHECK CONSTRAINT [FK_Form_Users]
GO
ALTER TABLE [dbo].[FormData]  WITH CHECK ADD FOREIGN KEY([FormID])
REFERENCES [dbo].[Form] ([FormID])
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
ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([userTypeID])
REFERENCES [dbo].[UserTypes] ([TypeID])
GO
ALTER TABLE [dbo].[Students]  WITH CHECK ADD CHECK  (([CurrentSemester]>=(1) AND [CurrentSemester]<=(8)))
GO
ALTER TABLE [dbo].[Students]  WITH CHECK ADD CHECK  (([Gender]='Other' OR [Gender]='Female' OR [Gender]='Male'))
GO
ALTER TABLE [dbo].[Students]  WITH CHECK ADD CHECK  (([Shift]='Day' OR [Shift]='Morning'))
GO
/****** Object:  StoredProcedure [dbo].[GetFormDataPivot]    Script Date: 2/17/2025 11:58:29 AM ******/
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
