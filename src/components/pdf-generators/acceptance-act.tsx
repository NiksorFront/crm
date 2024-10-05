import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

//Есть для Физ и Юр лиц! Здесь пока только для физ 
export default function acceptanceAct(){
    const d = new Date("<? echo $ticket->getCreatedAt() ?>");

        let data = {
            // date: new Intl.DateTimeFormat('ru-RU').format(d),
            date: 2000,
            number: 1,
            manager: "",
            customer: "",
            customerContactName: 'Петров П.П.',
            customerContactPhone: '',
            customerContactEmail: "",
            type: "",
            vendor: "",
            model: "",
            serialNumber: "",
            startDate: "",
            finishDate: "",
            problem: "",
            finishDateSplit: "",
        };
        
        //Лютый костыль начинается
        const details = [100, 200, 300];
        let summa = 0;
        const priceDelivery = 300;
        let totalDetails = 0
        // details.forEach(detail => {totalDetails+=parseInt(detail.amount)})
        details.forEach(detail => {totalDetails+=detail})
        const shiping = priceDelivery / totalDetails;
        
        // data.repairParts = details.map((detail, i) => {
        //     summa += parseInt(detail.amount)*parseInt(detail.price);
        //     const amount = detail.amount;
        //     const prc = `${parseInt(detail.price.split('.')[0])+shiping}`
        //     // console.log(priceDelivery)
        //     return ([ 
        //       {text: i+2,  fontSize: 10, bold: true},
        //       {text: `${detail.part_number} ${detail.name}`, fontSize: 10, bold: true},
        //       {text: '-',fontSize: 10, bold: true},
        //       {text: amount, fontSize: 10, bold: true},
        //       {text: prc.split('.')[0], fontSize: 10, bold: true},
        //       {text: parseInt(detail.amount)*parseInt(prc),fontSize: 10, bold: true},
        //     ]);
        // })
        // console.log(summa);
        const tableTitle = [ //Заголовки
                            {text: '№', fontSize: 10, lignment: 'center', bold: true},
                            {text: 'Наименование работы(услуги)', fontSize: 10, alignment: 'center', bold: true},
                            {text: 'Единицы измерения', fontSize: 10, alignment: 'center', bold: true },
                            {text: 'Количество', fontSize: 10, alignment: 'center', bold: true },
                            {text: 'Цена за единицы\n(в ₽, включая налоги)', fontSize: 10, alignment: 'center', bold: true},
                            {text: 'Стоимость\n(в ₽, включая налоги)', fontSize: 10, alignment: 'center', bold: true}];

        let type = '<? echo $repairType ?>';
        const typeName = type.split("(")[0];
        type =`(${type.split("(")[1]}`;
        const price = '<? echo $servicePrice ?>';
        summa += parseInt(price);
        summa += priceDelivery;
        const repairType = [
                            {text: '1',  fontSize: 10, bold: true},
                            {text: `Ремонт ${type} категории ${typeName}`, fontSize: 10, bold: true},
                            {text: '-',fontSize: 10, bold: true},
                            {text: '1',fontSize: 10, bold: true},
                            {text: price,fontSize: 10, bold: true},
                            {text: price,fontSize: 10, bold: true},
                        ];
        
        /*const tableDelivery = [ //Доставка
                                { text: `${data.repairParts.length+2}`, fontSize: 10, bold: true },
                                { text: 'доставка', fontSize: 10, bold: true },
                                { text: '\n\n', fontSize: 10, bold: true },
                                { text: '1', fontSize: 10, bold: true },
                                { text: priceDelivery.split('.')[0], fontSize: 10, bold: true},
                                {text: `${priceDelivery.split('.')[0]}`, fontSize: 10, bold: true},
                              ];*/

        const tableResult = [ //Итог
                                {border: [false, false, false, false], text: '\n\n', fontSize: 10, bold: true },
                                {border: [false, false, false, false], text: '\n\n', fontSize: 10, bold: true },
                                {border: [false, false, false, false], text: '\n\n', fontSize: 10, bold: true },
                                {border: [false, false, false, false], text: '\n\n', fontSize: 10, bold: true },
                                {border: [false, false, false, false], text: 'Итог:', alignment: 'right', fontSize: 10, margin:[0, 7, 0, 0], bold: true},
                                {text: `${summa}`, fontSize: 10, bold: true},
                              ];

        // console.log('Ю? echo num2str($deliveryPrice+$servicePrice+$detailPrice) ?>', "- число ");
        
        // data.repairParts.unshift(repairType);
        // data.repairParts.unshift(tableTitle);
        // // data.repairParts.push(tableDelivery);
        // data.repairParts.push(tableResult);
        // //костыль заканчивается

        // console.log(data.repairParts, data.repairType);

        pdfMake.fonts = {
            // download default Roboto font from cdnjs.com
            Roboto: {
              normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
              bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
              italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
              bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
            },
         }

        const docDefinition = {
                info: {
                    title: 'Акт о выполненных работах',
                    author: 'Service-V',
                    subject: 'акт выполненных работ',
                    keywords: '',
                    pageSize: 'A4',
                    pageOrientation: 'landscape', //'portrait'
                    pageMargins: {
                        left: 40,
                        top: 60,
                        right: 40,
                        bottom: 60
                    },
                    // header: "123243",
                    header: (currentPage: number, pageCount: number) => {
                        return {
                            text: currentPage.toString() + 'из' + pageCount,
                            alignment: 'right',
                            margin: [0, 30, 10, 50]
                        }
                    },

                    footer: [{
                        text: 'нижний колонтитул',
                        alignment: 'center', //left right
                    }],


                },

                content: [
                    {   //Отступ 10
                        text: "ООО «Сервис-В»",
                        fontSize: 20,
                        bold: true,
                    },
                    {   //Информация и лого
                        table: {
                            widths: [460, 70],
                            body: [
                                [ 
                                    {   border: [false, false, false, false],
                                        text: '127560, г. Москва, ул. Плещеева, 14А\nтел. +7 (499) 320-52-16\ne-mail: info@service-v.com\nИНН/КПП 7715904977/771501001, ОГРН 1127746113857\nр/c 40702810300014501532 в АО ЮниКредит Банк, БИК 044525545 к/с 30101810300000000545                                                             ',
                                        fontSize: 9,
                                    },
                                    {
                                        border: [false, false, false, false],
                                        // image: 'data:image/jpeg;base64,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',
                                        // svg: '<svg width="50" height="50" viewBox="0 0 50 50"><path d="M337.6 529.6c-105.6 0-192-86.4-192-192s86.4-192 192-192 192 86.4 192 192-86.4 192-192 192z m0-32c88 0 160-72 160-160s-72-160-160-160-160 72-160 160 70.4 160 160 160zM688 880c-105.6 0-192-86.4-192-192s86.4-192 192-192 192 86.4 192 192-86.4 192-192 192z m0-32c88 0 160-72 160-160s-72-160-160-160-160 72-160 160 72 160 160 160z" fill="#050D42" /><path d="M393.6 412.8c-48 0-88-40-88-88s40-88 88-88 88 40 88 88-40 88-88 88z m0-16c40 0 72-32 72-72s-32-72-72-72-72 32-72 72 32 72 72 72zM676.8 832c-48 0-88-40-88-88s40-88 88-88 88 40 88 88-40 88-88 88z m0-16c40 0 72-32 72-72s-32-72-72-72-72 32-72 72 32 72 72 72z" fill="#050D42" /><path d="M708.8 777.6c-1.6 3.2-3.2 4.8-4.8 6.4-9.6 9.6-24 9.6-33.6 0-9.6-9.6-9.6-24 0-33.6 6.4-6.4 17.6-8 25.6-4.8 0-12.8 4.8-24 14.4-33.6 19.2-19.2 49.6-19.2 67.2 0s19.2 49.6 0 67.2-48 17.6-68.8-1.6c1.6 0 1.6 0 0 0z m-54.4-56c-6.4 6.4-16 6.4-22.4 0-6.4-6.4-6.4-16 0-22.4 6.4-6.4 16-6.4 22.4 0 4.8 6.4 4.8 16 0 22.4z m100.8-56c-6.4 6.4-16 6.4-22.4 0-6.4-6.4-6.4-16 0-22.4 6.4-6.4 16-6.4 22.4 0 6.4 4.8 6.4 16 0 22.4z m-113.6-68.8c-6.4 6.4-16 6.4-22.4 0-6.4-6.4-6.4-16 0-22.4 6.4-6.4 16-6.4 22.4 0 6.4 6.4 6.4 16 0 22.4zM292.8 289.6l-1.6 1.6c-6.4 6.4-16 6.4-22.4 0-6.4-6.4-6.4-16 0-22.4 4.8-4.8 14.4-6.4 19.2-1.6 0-11.2 4.8-22.4 14.4-32 19.2-19.2 49.6-19.2 67.2 0s19.2 49.6 0 67.2c-19.2 19.2-49.6 19.2-67.2 0-3.2-3.2-6.4-8-9.6-12.8z m145.6 59.2c-6.4 6.4-16 6.4-22.4 0-6.4-6.4-6.4-16 0-22.4 6.4-6.4 16-6.4 22.4 0 6.4 4.8 6.4 16 0 22.4z m-214.4 11.2c-6.4 6.4-16 6.4-22.4 0-6.4-6.4-6.4-16 0-22.4s16-6.4 22.4 0c6.4 4.8 6.4 16 0 22.4z m84.8 96c-9.6 9.6-24 9.6-33.6 0-9.6-9.6-9.6-24 0-33.6 9.6-9.6 24-9.6 33.6 0s9.6 24 0 33.6z" fill="#2F4BFF" /><path d="M206.4 467.2l11.2-11.2c41.6 41.6 80 56 136 59.2 4.8 0 32 1.6 40 1.6 32 3.2 54.4 9.6 72 28.8 16 16 25.6 36.8 30.4 65.6 1.6 11.2 6.4 52.8 6.4 51.2 8 60.8 24 100.8 65.6 142.4l-11.2 11.2c-44.8-44.8-62.4-88-70.4-152 0 1.6-4.8-40-6.4-51.2-4.8-25.6-11.2-43.2-25.6-57.6-14.4-14.4-33.6-20.8-62.4-24-8 0-35.2-1.6-40-1.6-57.6-1.6-100.8-17.6-145.6-62.4z m611.2 89.6l-11.2 11.2c-41.6-41.6-81.6-57.6-142.4-65.6 1.6 0-40-4.8-51.2-6.4-28.8-4.8-49.6-12.8-65.6-30.4-17.6-17.6-25.6-40-28.8-72 0-8-1.6-35.2-1.6-40-3.2-56-17.6-94.4-59.2-136l11.2-11.2c44.8 44.8 60.8 86.4 64 147.2 0 4.8 1.6 33.6 1.6 40 1.6 28.8 8 46.4 24 62.4 14.4 14.4 32 20.8 57.6 25.6 11.2 1.6 52.8 6.4 51.2 6.4 62.4 8 105.6 24 150.4 68.8z" fill="#050D42" /></svg>',
                                        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="3149.333" height="3149.333" version="1.0" viewBox="0 0 2362 2362"><path d="M462 268.2c-34 4.8-62 31.7-69.1 66.2-1.8 8.8-1.9 29.6-1.9 730.8 0 455.2.4 721.8 1 721.8.5 0 .9 3.7.9 8.2.1 12.8.9 18.2 4.2 27.2 10 27.8 34 48.8 61.6 54.1 6.9 1.3 95.7 1.5 738.8 1.5 637.9 0 732-.2 738.7-1.5 8.3-1.6 21-7 30.2-12.9 15.7-10 29.5-30.6 33.6-50.1 1.9-8.8 2-23 2-740.2 0-667.4-.1-732-1.6-739.5-1.1-5.7-3.4-11.9-7.1-19.6-4.6-9.5-6.8-12.7-13.7-19.9-11.8-12.5-25.3-20.3-42.1-24.7l-8-2-730.5-.2c-443.6-.1-733 .2-737 .8zm1463.9 31.7c5.4.7 9.5 2 15.6 5 10.9 5.4 17.6 12.1 23.5 23.6l4.5 8.8v1471.4l-4.5 8.8c-5.8 11.3-12.2 17.8-23.1 23.5l-8.4 4.5h-1472l-7.4-3.8c-13.4-6.9-20.1-14.1-26.1-27.7-3.1-7-3.4-8.6-4.2-23-.4-8.5-.7-338.8-.6-734l.3-718.5 4.2-8.8c6.8-14.1 16.5-22.8 32.3-28.8 4.2-1.6 45.4-1.7 731.5-1.8 399.9 0 730.3.4 734.4.8z"/><path d="M619.9 367.3c-8.8 2.5-13.9 7.2-18.7 17.4l-2.7 5.8-.3 57.9c-.3 63.9-.2 64.5 5.9 71.9 6.3 7.6 8.4 8.1 35.5 8.7 26.5.6 26.6.6 28.4 6.9 1.5 5.4 1.2 99.7-.3 103.6-3.4 8.9-7.3 10.5-24.5 10.5-7.1 0-14.3-.5-16-1.1-5.3-1.8-5.6-4-6-40.9l-.3-33.5-2.6-2.8c-2.3-2.3-3.4-2.7-8.6-2.7-4.9 0-6.6.5-9.4 2.6l-3.4 2.6.3 37.6.3 37.7 2.7 5.8c4 8.5 8.2 13.2 14.2 16.2l5.4 2.6 26.3-.3c26.4-.3 26.4-.3 31.4-3 7.5-3.9 11.7-9.4 14.9-19.4 1.5-4.6 1.6-11.9 1.4-70.6l-.3-65.4-2.7-4.1c-1.6-2.4-4.4-4.9-7-6.2-4.2-2-6-2.1-29.7-2.1h-25.3l-2.9-2.9-2.9-2.9v-46.7c0-47.8.3-52.6 4-57.5l1.9-2.5h17.9c20.7 0 21.3.2 23.1 8.6.7 2.9 1.1 17.8 1.1 35.8v30.7l2.8 2.7c2.5 2.4 3.6 2.7 9.3 2.7 5.9 0 6.8-.3 9.3-2.9l2.7-2.8-.3-37.9c-.3-37.1-.4-38-2.7-43.7-2.8-7-7-12-12.5-15-3.9-2.1-5.5-2.2-29.6-2.4-18.1-.2-26.8.1-30.1 1zM981.8 368.7l-2.8 2.9V668.9l2.7 2.6c2.4 2.2 3.7 2.5 9.9 2.5 6.1 0 7.3-.3 9.2-2.3l2.2-2.3V541.9l8.7.3 8.7.3 2.8 4c5.3 7.6 10.3 25.3 25.3 89.9 4.7 20.2 8.5 37 8.5 37.2 0 .2 5 .4 11 .4 10.8 0 11.2-.1 13.5-2.8 1.3-1.5 2.5-3.3 2.5-4 0-.7-1.1-5.8-2.5-11.5-1.3-5.6-5.8-24.8-10-42.6-10.8-46.4-16.4-65.3-21.6-73.8l-2.1-3.3 5.4-4.9c14.9-13.7 21.8-38.5 21.9-78.2 0-38.8-6.3-65.1-18.6-77.5-8.2-8.3-10.2-8.7-43.5-9.2l-28.5-.4-2.7 2.9zm52.6 20.2c11.6 5.7 16 21.8 16 57.6 0 22.1-1.3 33.3-5.6 48.5-5.9 21.2-10.4 25-29.8 25h-11V385.8l12.8.4c11 .3 13.4.6 17.6 2.7zM1142.7 369.2l-3.5 3.3 3.3 20c1.8 11 7 42.5 11.5 70 4.4 27.5 10.5 65.1 13.5 83.5 12.5 76.8 18.4 112.9 19.6 120.2l1.2 7.8h13.3c13 0 13.4-.1 13.9-2.3.2-1.2 3.2-17.7 6.4-36.7 3.3-19 9.2-52.5 13-74.5 23.5-134.9 32.1-184.6 32.1-186.8 0-1.6-1.2-3.5-3.1-5.1-2.9-2.4-3.7-2.6-13.4-2.6-6.6 0-10.6.4-11.1 1.1-.9 1.5-14.1 82.8-20.9 128.4-3 20.3-7.7 52.2-10.5 70.7-2.7 18.5-5 34.2-5 34.9 0 5-1.7-4.3-5.9-32.7-15.3-101.8-20.7-137.3-25.4-167.9l-5.2-33.9-10.2-.4-10.1-.4-3.5 3.4zM1365.7 368.8l-2.7 2.8V674h10.3c10 0 10.4-.1 13-2.8l2.7-2.8v-297l-2.8-2.7c-2.5-2.4-3.5-2.7-10.3-2.7-6.9 0-7.7.2-10.2 2.8zM1505.7 367.4c-8 2.2-12.7 6.3-17.2 15.1l-4 7.8v259.2l2.4 5.9c1.5 3.8 4.2 7.7 7.1 10.7 7.4 7.4 10.8 8.1 40.2 7.7 23.6-.3 24.4-.4 29.1-2.8 6-3 10.2-7.6 13.6-15l2.6-5.5.3-38.1.3-38.1-3-2.6c-2.5-2-4-2.5-9.1-2.5s-6.6.5-9.1 2.5l-2.9 2.5v31.9c0 32.4-.6 39.5-3.8 42.1-2.2 1.8-29 2.4-34.9.8-8.4-2.4-7.8 7.9-8.1-125.5-.2-82.6 0-119.5.8-123 .6-2.8 1.9-6.1 3-7.5l1.9-2.5h17.9c20.7 0 21.3.2 23.1 8.6.7 2.9 1.1 17.8 1.1 35.8v30.7l2.8 2.7c2.5 2.4 3.6 2.7 9.3 2.7 5.9 0 6.8-.3 9.3-2.9l2.7-2.8-.3-36.9-.3-36.9-2.6-5.5c-3.7-7.8-9-13.4-15.7-16.7-5.7-2.8-5.7-2.8-28.7-3-16.6-.2-24.3.1-27.8 1.1zM790.7 369.8l-2.7 2.8v295.8l2.7 2.8 2.7 2.8h87.2l2.7-2.8c2.9-3 3.4-7.6 2.1-17.6l-.7-4.6H814V529h58.6l2.7-2.8c2.4-2.5 2.7-3.6 2.7-10 0-5.9-.4-7.6-2.2-9.7l-2.2-2.5H814V391h69v-9.3c0-8.5-.2-9.4-2.5-12l-2.6-2.7h-84.5l-2.7 2.8zM1676.7 369.8l-2.7 2.8v295.8l2.7 2.8 2.7 2.8H1767.1l2.4-2.8c2.6-2.9 3.2-8.1 1.9-17.6l-.7-4.6h-71.2l.2-59.8.1-59.7 29.3-.3 29.3-.2 2.8-2.7c2.6-2.4 2.8-3.3 2.8-9.9 0-6.3-.3-7.7-2.4-9.8l-2.3-2.6h-59.2l-.3-3.8c-.2-2-.2-27.4 0-56.5l.2-52.7h69v-9.3c0-8.9-.1-9.4-2.8-12l-2.8-2.7h-84l-2.7 2.8zM572 728v5h1215v-10H572v5zM1537.2 814.2c-83 89.8-164 200.3-242.5 330.8-11.6 19.3-18.5 31-37.1 63.4-6.3 10.9-29.9 53.8-39.1 71.1-26.6 49.9-63.6 125.3-82.1 167.2-4.4 10.1-6.4 13.3-6.4 10.3 0-.6-4.7-11.8-10.5-25.1-67.1-152.9-137-269.5-189.9-317-17.7-15.9-33.3-24.9-48.7-28.3-4.2-.9-12.6 6.4-26.4 22.8-12.1 14.4-16.3 19.4-50.7 60.3l-18.6 22.1 15.6 13c81 67 150.5 150.9 208.2 251.3 12.6 21.9 38.2 72.6 48.4 95.9 29.9 67.9 53.4 139.2 66.1 200 3.7 18 3.5 17.7 6.2 8 8.8-31.1 30.3-90.3 45.5-125.5 51.6-119.3 110.6-223.8 188.1-333 73-102.8 154.5-197.1 250.7-290 24.6-23.8 72.6-67.1 95.8-86.5 2.9-2.4 5.1-4.7 5-5.2-.3-.7-16.3-13.1-48.8-37.8-14.9-11.3-67.9-51.7-91.3-69.7-10.4-7.9-19.4-14.6-20.1-14.9-.8-.3-7.9 6.6-17.4 16.8z"/></svg>',
                                        width: 70
                                    },
                                ]
                            ]
                        },
                        margin: [-5, 0, 0, 0]
                    },
                    {   //Акт приёмки выполненных работ
                        //text: `Акт приемки выполненных работ № ${data.number} от « ${data.finishDateSplit[2].slice(0,2)} » ${data.finishDateSplit[1]} ${data.finishDateSplit[0]} г.`,
                        text: `Акт приемки выполненных работ № ${data.number} от ${data.finishDateSplit[0]} ${data.finishDateSplit[1]} ${data.finishDateSplit[2]} г.`,
                        fontSize: 13,
                        bold: true
                    },

                    {   //Данный Акт является и т.д.
                        text: 'Данный акт является также гарантийным талоном и счётом-офертой. Подписывая настоящий акт заказчик\nсоглашается с условиями оказания услуг/выполнения работ, указанными в настоящем акте.',
                        fontSize: 10,
                    },

                    {   //Отступ 10
                        text: '\n', fontSize: 10,
                    },

                    {   //Исполнитель
                        text:"Исполнитель: ООО «Сервис-В»",
                        fontSize: 10,
                        bold: true
                    },

                    {   //Отступ 8
                        text: '\n', fontSize: 8,
                    },

                    {   //Заказчик
                        text: `Заказчик: ${data.customer}`,
                        // text:`Заказчик: ______________________________________________________________________________________________________`,
                        fontSize: 10,
                        bold: true
                    },

                    {   //Отступ 10
                        text: '\n',fontSize: 10,
                    },

                    {   //Исполнитель оказывает
                        text: 'Исполнитель оказывает услуги/выполняет работы по поручению заказчика, указанные в настоящем акте:',
                        fontSize: 10,
                    },

                    {   //Отступ 5
                        text: '\n',
                        fontSize: 5,
                    },

                    {   //Таблица
                        table: {
                            //widths: [30, 45, 85, 95, 120, 95],
                            widths: [62, 62, 62, 92, 92, 92], //[80, 80, 80, 75, 85, 65]
                            body: [
                                [   {
                                        text: 'Вид',
                                        fontSize: 10,
                                        alignment: 'center',
                                        bold: true
                                    },
                                    {
                                        text: 'Марка',
                                        fontSize: 10,
                                        alignment: 'center',
                                        bold: true
                                    },
                                    {
                                        text: 'Модель',
                                        fontSize: 10,
                                        alignment: 'center',
                                        bold: true
                                    },
                                    {
                                        text: 'Серийный номер',
                                        fontSize: 10,
                                        alignment: 'center',
                                        bold: true
                                    },
                                    {
                                        text: 'Дата начала работ',
                                        fontSize: 10,
                                        alignment: 'center',
                                        bold: true
                                    },
                                    {
                                        text: 'Дата завершения работ',
                                        fontSize: 10,
                                        alignment: 'center',
                                        bold: true
                                    },
                                    // {
                                    //     text: 'Гарантийный срок',
                                    //     fontSize: 10,
                                    //     alignment: 'center',
                                    //     bold: true
                                    // },
                                ],
                                [
                                    {
                                        text: `${data.type}`,
                                        fontSize: 10,
                                        bold: true
                                    },
                                    {
                                        text: `${data.vendor}`,
                                        fontSize: 10,
                                        bold: true
                                    },
                                    {
                                        text: `${data.model}`,
                                        fontSize: 10,
                                        bold: true
                                    },
                                    {
                                        text: `${data.serialNumber}`,
                                        fontSize: 10,
                                        bold: true
                                    },
                                    {
                                        text: `${data.startDate}`,
                                        fontSize: 10,
                                        bold: true
                                    },
                                    {
                                        text: `${data.finishDate}`,
                                        fontSize: 10,
                                        bold: true
                                    },
                                    // {
                                    //     text: '\n\n',
                                    //     fontSize: 10,
                                    //     bold: true
                                    // },
                                ]
                            ]
                        }
                    },

                    {   //Отступ 15
                        text: '\n',fontSize: 15,
                    },

                    {   //Исполнитель оказывает
                        text: 'Причина обращения ( со слов Заказчика)',
                        alignment: 'center',
                        fontSize: 10,
                    },

                    {   //Отступ 10
                        text: '\n',fontSize: 10,
                    },
                    {   //Отображаем причину
                        text: `${data.problem}`,
                        fontSize: 13,
                        alignment: 'center',
                    },
                    
                    {   //Отступ 15
                        text: '\n',fontSize: 15,
                    },

                    // {   //Таблица
                    //     table: {
                    //         //widths: [30, 45, 85, 95, 120, 95],
                    //         widths: [30, 175, 65, 60, 70, 70],
                    //         body: data.repairParts, //костыль отображается
                            
                    //     }
                    // },

                    {   //Отступ 5
                        text: '\n', fontSize: 5,
                    },

                    {   //Всего оказано на сумму
                        text:`Всего оказано на сумму: ${'<? echo num2str($deliveryPrice+$servicePrice+$detailPrice) ?>'}`,
                        fontSize: 10,
                        bold: true
                    },

                    {   //Отступ 10
                        text: '\n',fontSize: 10,
                    },

                    {   //Информация для клиаента
                        text:"Информация для клиаента:",
                        fontSize: 10,
                        bold: true
                    },

                    {   //Информация
                        text: `1. Гарантия не распространяется на дефекты вызванные перегрузкой оборудования или техническим/технологическим воздействием, не правильной и небрежной эксплуатацией.
                                2. Гарантия не распространяется на дефекты вызванные перебоями в электропитании и скачками напряжения в сети.
                                3. Мастер может отказать Заказчику в оказании услуг в случае: нехватки материалов, либо в случае, если материалы приобретались Заказчиком без предварительного согласования со специалистом Исполнителя.
                                4. Гарантийный срок начинает течь с момента подписания настоящего Акта.
                                5. Оказание услуг/выполнение работ подтверждается подписанием настоящего Акта. Услуги/работы считаются надлежаще оказанными и принимаются Заказчиком в полном объеме в момент подписания настоящего Акта и подлежат оплате в течении 3(трех) дней с момента подписания Акта в безналичном порядке путем перечисления на реквизиты, указанные в Акте.`,
                        fontSize: 6
                    },

                    /*{   //строка
                        text: '_______________________________________________________________________________________________',fontSize: 10,
                    },
                    {    //строка
                        text: '_______________________________________________________________________________________________',fontSize: 10,
                    },
                    {    //строка
                        text: '_______________________________________________________________________________________________',fontSize: 10,
                    },
                    {    //строка
                        text: '_______________________________________________________________________________________________',fontSize: 10,
                    },*/
                    {   //Отступ 10
                        text: '\n',fontSize: 10,
                    },

                    {   //Акт составлен
                        text:"Акт составлен в 3(трех) экземплярах, по одному для каждой из сторон и третий - для мастера.\nВышеперечисленные работы (услуги) выполнены полностью и в срок.\nПретензий по объему, качеству, суммой калькуляции и срокам оказания услуг заказчик не имеет.",
                        fontSize: 10
                    },
                    {   //Отступ 10
                        text: '\n',fontSize: 10,
                    },
                    {   //Заказчик
                        table: {
                            widths: [75, 440],
                            body: [
                                [ 
                                    {   border: [false, false, false, false],
                                        text: 'Заказчик:',
                                        fontSize: 11,
                                        bold: true
                                    },
                                    {   
                                        table: {
                                            widths: [100,200],
                                            body: [
                                                [
                                                    {
                                                        border: [false, false, false, false],
                                                        text: '___________________________',
                                                        fontSize: 8,
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: '_____________________________________________________',
                                                        fontSize: 8,
                                                    },
                                                ],
                                                [
                                                    {
                                                        border: [false, false, false, false],
                                                        text: '(подпись)',
                                                        alignment: 'center',
                                                        fontSize: 8,
                                                        margin: [0, -5, 0, 0]
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: '(Ф.И.О.)',
                                                        alignment: 'center',
                                                        fontSize: 8,
                                                        margin: [0, -5, 0, 0]
                                                    },
                                                ]

                                            ]
                                        },
                                        border: [false, false, false, false],
                                    },
                                ]
                            ]
                        },
                        margin: [-5, 0, 0, 0]
                    },
                    {   //Исполнитель
                        table: {
                            widths: [75, 440],
                            body: [
                                [ 
                                    {   border: [false, false, false, false],
                                        text: 'Исполнитель:',
                                        fontSize: 11,
                                        bold: true
                                    },
                                    {   
                                        table: {
                                            widths: [100,200],
                                            body: [
                                                [
                                                    {
                                                        border: [false, false, false, false],
                                                        text: '___________________________',
                                                        fontSize: 8,
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: '_____________________________________________________',
                                                        fontSize: 8,
                                                    },
                                                ],
                                                [
                                                    {
                                                        border: [false, false, false, false],
                                                        text: '(подпись)',
                                                        alignment: 'center',
                                                        fontSize: 8,
                                                        margin: [0, -5, 0, 0]
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: '(Ф.И.О.)',
                                                        alignment: 'center',
                                                        fontSize: 8,
                                                        margin: [0, -5, 0, 0]
                                                    },
                                                ]

                                            ]
                                        },
                                        border: [false, false, false, false],
                                    },
                                ]
                            ]
                        },
                        margin: [-5, 0, 0, 0]
                    },
                ],

                styles: {
                    header: {
                        fontSize: 20,
                        bold: true,
                        alignment: 'center',
                        textTransform: 'uppercase'
                    },
                    info: {
                        fontSize: 14
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black',
                        fillColor: '#ccc'
                    },
                    footer: {
                        fontSize: 14,
                        alignment: 'right'
                    },
                    footerSignature: {
                        italics: true
                    },

                    subheader: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 5]
                    },
                    tableExample: {
                        margin: [0, 5, 0, 15],
                        widths: [40, 90, 80, 60],
                    },
                    
                },

        }
        //@ts-ignore
        pdfMake.createPdf(docDefinition).open();
}