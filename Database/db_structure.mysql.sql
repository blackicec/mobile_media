CREATE DATABASE MobileMedia;

USE MobileMedia;

CREATE TABLE AccessKeys
(
    id         INT         NOT NULL PRIMARY KEY AUTO_INCREMENT,
    screenName varchar(32) NULL UNIQUE ,
    accessKey  varchar(16) NOT NULL UNIQUE ,
    isActive   bit         NOT NULL DEFAULT 0,
    createDate timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ActivityLogs
(
    id         int          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    level      varchar(16)  NULL     DEFAULT ('INFO'),
    message    varchar(512) NOT NULL ,
    createDate timestamp    DEFAULT CURRENT_TIMESTAMP,
    createUser varchar(32)  NOT NULL,
    FOREIGN KEY (createUser) REFERENCES AccessKeys(accessKey) ON DELETE CASCADE
);

CREATE USER 'mobile_media'@'%' IDENTIFIED WITH mysql_native_password BY '[secure_password]';

GRANT SELECT, INSERT, UPDATE ON AccessKeys TO 'mobile_media'@'%';
GRANT SELECT, INSERT ON ActivityLogs TO 'mobile_media'@'%';

FLUSH PRIVILEGES;

-- Now populate some users
INSERT INTO AccessKeys (screenName, accessKey, isActive)
VALUES ('User A', 'iuOfChKPb1', 1);
INSERT INTO AccessKeys (screenName, accessKey)
VALUES ('User B', '1nDK468scu');
