import pdfMake from 'pdfmake/build/pdfmake';


export default function completedWorksAct(){
    console.log("Генерится pdf акта выполненных работ");

    var d = new Date("<? echo $acceptanceTicket->getCreatedAt() ?>");

   // Изначально данные заданы в объекте data
    let data = {
    number: "АП12345", // Заменяем echo на примерный ID
    date: new Intl.DateTimeFormat('ru-RU').format(new Date()), // Устанавливаем текущую дату
    manager: ' ', // Менеджер пока не задан
    customerContactName: 'Иванов Иван Иванович', // Пример имени контакта клиента
    customerContactPhone: '+7 (900) 123-45-67', // Пример телефона клиента
    customerContactEmail: 'ivanov@example.com', // Пример email клиента
    type: "Смартфон", // Пример типа устройства
    vendor: "Samsung", // Пример производителя
    model: "Galaxy S21", // Пример модели устройства
    serialNumber: "SN123456789" // Пример серийного номера устройства
};

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
            title: 'Прием оборудования в ремонт',
            author: 'Service-V',
            subject: 'перечень оборудования',
            keywords: '',
            pageSize: 'A4',
            pageOrientation: 'landscape', //'portrait'
            pageMargins: {
                left: 40,
                top: 60,
                right: 40,
                bottom: 60
            },

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

            {
                table: {
                    widths: [60, 350, 100],
                    body: [
                        [{
                                border: [false, false, false, false],
                                image: 'data:image/jpeg;base64,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',
                                width: 30
                            },
                            {
                                border: [false, false, false, false],
                                text: ""
                            },
                            {
                                border: [false, false, false, false],
                                text: 'Service-V.com\n+7(499)320-52-16',
                                fontSize: 12,
                                bold: true
                            }
                        ]
                    ]
                }
            },

            {
                text: '\n\n',
                fontSize: 18,
                bold: true
            },

            {
                text: 'Акт приёма-передачи оборудования в ремонт №' + data.number,
                fontSize: 14,
                bold: true,
                alignment: 'center'
            },
            {
                text: '\n\n',
                fontSize: 10,
                bold: true
            },
            {
                text: 'Дата: ' + data.date,
                fontSize: 14,
                bold: false,
                alignment: 'left'
            },




            {
                table: {
                    widths: [253, 253],
                    body: [
                        [{

                                border: [true, true, false, true],
                                text: 'Исполнитель',
                                bold: true
                            },

                            {
                                border: [false, true, true, true],
                                text: ''
                            }
                        ],

                        [{

                                border: [true, true, true, true],
                                text: 'Наименование'
                            },

                            {
                                border: [true, true, true, true],
                                text: 'ООО "Сервис-В"'
                            }
                        ],

                        [{

                                border: [true, true, true, true],
                                text: 'Ответственное лицо исполнителя'
                            },

                            {
                                border: [true, true, true, true],
                                text: data.manager
                            }
                        ],



                        [{
                                border: [true, true, false, true],
                                text: 'Заказчик',
                                bold: true
                            },

                            {
                                border: [false, true, true, true],
                                text: '',
                                fontSize: 12,
                                bold: true
                            }
                        ],

                        [{

                                border: [true, true, true, false],
                                text: 'Имя'
                            },

                            {
                                border: [true, true, true, false],
                                text: data.customerContactName
                            }
                        ],

                        [{

                                border: [true, true, true, false],
                                text: 'Телефон'
                            },

                            {
                                border: [true, true, true, false],
                                text: data.customerContactPhone
                            }
                        ],

                        [{

                                border: [true, true, true, true],
                                text: 'Email'
                            },

                            {
                                border: [true, true, true, true],
                                text: data.customerContactEmail
                            }
                        ]





                    ]
                }
            },








            {
                text: '\n\n',
                fontSize: 15,
                bold: true
            },

            {
                text: 'Перечень оборудования: \n',
                fontSize: 15,
                bold: true
            },



            // {
            // image: '/service-v.ru/wp-content/themes/service-v/assets/icons/logo.jfif',
            // },



            {


                table: {
                    headerRows: 2,
                    widths: ['auto', '*', 'auto'],
                    body: [
                        ['№ п/п', 'Оборудование, принимаемое в ремонт', 'Кол-во'],
                        ['1', `${data.type} ${data.vendor} ${data.model} S/N: ${data.serialNumber}`, '1'],
                    ]
                }
            },
            {
                text: '\n\n'
            },

            {
                text: `Представитель заказчика ${data.customerContactName} подтверждает количество и наименование устройств переданных исполнителю. Заказчик обязуется оплатить неоплаченную часть работы исполнителя согласно выставленному счету в течение семи дней со дня получения закрывающих документов на ремонт техники.`,
                alignment: 'justify'
            },
            {
                text: '\n\n\n\n\n\n\n\n\n\n', fontSize: 15,
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
            {
                text: '\n'
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