CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` text DEFAULT NULL,  
  PRIMARY KEY (`id`)
);

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` VARCHAR(11) DEFAULT NULL,  
  `address` text DEFAULT NULL,  
  PRIMARY KEY (`id`)
);name, email, phone, address

INSERT INTO `users` (`nama`, `email`, `password`) VALUES
('narji', 'narji@maul.com', 'narji123');`

DROP TABLE IF EXISTS users;