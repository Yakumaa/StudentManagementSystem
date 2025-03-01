USE [StudentManagementSystem]
GO
/****** Object:  StoredProcedure [dbo].[GetStudentDetailsByBatchYear]    Script Date: 2/27/2025 8:54:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetStudentDetailsByBatchYear]
    @BatchYear INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @BatchYearStr VARCHAR(10);
    SET @BatchYearStr = CONVERT(VARCHAR(10), @BatchYear);

    CREATE TABLE #StudentDetails
    (
        DataID INT,
        FormID INT,
        TemplateID INT,
        RegistrationNumber VARCHAR(255),
        FirstName VARCHAR(255),
        LastName VARCHAR(255),
        BatchYear VARCHAR(10),
        SubmittedAt DATETIME,
        SubmittedBy INT,
        ProfilePictureFileName VARCHAR(255),
        UserName VARCHAR(255)
    );

    INSERT INTO #StudentDetails (DataID, FormID, TemplateID, RegistrationNumber, FirstName, LastName, BatchYear, SubmittedAt, SubmittedBy, ProfilePictureFileName, UserName)
    SELECT 
        fd.dataId,
        f.FormID,
        fd.TemplateID,
        fd.FieldValue1,                         
        fd.FieldValue2,                          
        fd.FieldValue3,                          
        fd.FieldValue11,                         
        f.submittedAt,
        f.submittedBy,
        ff.FileName,                              
        u.username
    FROM FormData fd
    INNER JOIN Form f
        ON fd.formId = f.FormID
    INNER JOIN FormTemplates ft
        ON fd.TemplateID = ft.TemplateID
    LEFT JOIN FormFiles ff
        ON f.FormID = ff.FormID 
           AND ff.FileType LIKE 'image/%'        
    INNER JOIN Users u
        ON f.submittedBy = u.userID
    WHERE fd.FieldValue11 = @BatchYearStr;        

    SELECT * FROM #StudentDetails;

    DROP TABLE #StudentDetails;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetStudentDetailsByDepartmentName]    Script Date: 2/27/2025 8:54:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetStudentDetailsByDepartmentName]
    @DeptName NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @DeptID INT;

    SELECT @DeptID = departmentId
    FROM Departments
    WHERE departmentName = @DeptName;

    IF @DeptID IS NULL
    BEGIN
        RAISERROR('Department not found', 16, 1);
        RETURN;
    END

    CREATE TABLE #TempStudentDetails
    (
        FormID INT,
        RegistrationNumber VARCHAR(50),
        StudentName VARCHAR(100),
        DepartmentName VARCHAR(100),
        SubmittedAt DATETIME
    );

    INSERT INTO #TempStudentDetails (FormID, RegistrationNumber, StudentName, DepartmentName, SubmittedAt)
    SELECT 
        f.FormID,
        fd.FieldValue1, 
        fd.FieldValue2 + ' ' + fd.FieldValue3, 
        d.departmentName,
        f.submittedAt
    FROM FormData fd
    INNER JOIN Form f ON fd.formId = f.FormID
    INNER JOIN Departments d ON d.departmentId = CONVERT(INT, fd.FieldValue10)
    WHERE d.departmentId = @DeptID;

    SELECT * FROM #TempStudentDetails;

    DROP TABLE #TempStudentDetails;
END;
GO
