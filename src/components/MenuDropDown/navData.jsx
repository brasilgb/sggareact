const navData = [
    {
       "menu": "Home",
        "url": "/",
        "slug": "",
        "submenu": null
      },
      {
       "menu": "Ciclos",
        "url": "/ciclos",
        "slug": "",
        "submenu": null
      },{
      "menu": "Lotes/Aviários",
      "url": "#",
      "submenu": [
        {
          "menu": "Lotes",
           "url": "/lotes",
         }, {
          "menu": "Aviários",
           "url": "aviarios",
         }
      ]
    },{
      "menu": "Coletas",
       "url": "coletas",
       "submenu": null
     },{
      "menu": "Ovos",
      "url": "#",
      "submenu": [
        {
          "menu": "Envio",
           "url": "envios",
         }, {
          "menu": "Descarte",
           "url": "",
         }
      ]
    },{
      "menu": "Aves",
      "url": "#",
      "submenu": [
        {
          "menu": "Mortalidades",
           "url": "mortalidades",
         }, {
          "menu": "Pesagem",
           "url": "pesagens",
         }
      ]
    },{
      "menu": "Ração",
      "url": "#",
      "submenu": [
        {
          "menu": "Recebimento",
           "url": "recebimentos",
         }, {
          "menu": "Consumo",
           "url": "consumos",
         }
      ]
    },{
      "menu": "Tarefas",
      "url": "#",
      "submenu": [
        {
          "menu": "Tarefas Gerais",
           "url": "geraltarefas",
         }, {
          "menu": "Controle Diário",
           "url": "controlediarios",
         }
      ]
    },{
      "menu": "Financeiro",
      "url": "#",
      "submenu": [
        {
          "menu": "Despesas",
           "url": "despesas",
         }, {
          "menu": "Entradas",
           "url": "financeiros",
         }
      ]
    },{
      "menu": "Metas",
      "url": "#",
      "submenu": [
        {
          "menu": "Eclosão",
           "url": "metas.eclosao",
         }, {
          "menu": "Fertilidade",
           "url": "metas.fertilidade",
         },{
          "menu": "Produção",
           "url": "metas.producao",
         }
      ]
    },{
      "menu": "Configurações",
      "url": "#",
      "submenu": [
        {
          "menu": "Empresa",
           "url": "empresas",
         }, {
          "menu": "E-mail",
           "url": "emails",
         }, {
          "menu": "Backup",
           "url": "backups",
         }, {
          "menu": "Usuários",
           "url": "usuarios",
         }
      ]
    },{
      "menu": "Relatórios",
      "url": "#",
      "submenu": [
        {
          "menu": "Movimento Diário",
           "url": "relatorios/movimentodiario",
         }, {
          "menu": "Coletas",
           "url": "relatorios/coleta",
         }, {
          "menu": "Financeiro",
           "url": "relatorios/financeiro",
         }, {
          "menu": "Estoque de Aves",
           "url": "relatorios/estoqueave",
         }, {
          "menu": "Estoque de Ovos",
           "url": "relatorios/estoqueovo",
         }, {
          "menu": "Consumo Ração",
           "url": "relatorios/consumo",
         }
      ]
    }
  ];
  export default navData;