// import { Module } from '@nestjs/common';
// import { WinstonModule } from 'nest-winston';
// import * as winston from 'winston';
// import * as DailyRotateFile from 'winston-daily-rotate-file';

// // Định nghĩa các transport cho Winston
// const transports = [
//     // Ghi log ra console
//     new winston.transports.Console({
//         format: winston.format.combine(
//             winston.format.colorize(),
//             winston.format.timestamp(),
//             winston.format.printf(({ timestamp, level, message, context }) => {
//                 return `${timestamp} [${level}] ${context || 'Application'}: ${message}`;
//             }),
//         ),
//     }),
//     // Ghi log vào file, luân chuyển hàng ngày
//     new DailyRotateFile({
//         filename: 'logs/application-%DATE%.log',
//         datePattern: 'YYYY-MM-DD',
//         maxSize: '20m', // Giới hạn kích thước file log
//         maxFiles: '14d', // Lưu file log trong 14 ngày
//         format: winston.format.combine(
//             winston.format.timestamp(),
//             winston.format.json(), // Định dạng JSON để dễ phân tích
//         ),
//     }),
// ];

// @Module({
//     imports: [
//         WinstonModule.forRoot({
//             level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
//             transports,
//         }),
//     ],
// })
// export class LoggerModule { }
