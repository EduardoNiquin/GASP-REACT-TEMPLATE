function doGet() {
    return HtmlService.createTemplateFromFile("index")
      .evaluate()
      .setTitle("TITLE-GAPS")
      .addMetaTag("viewport", "width=device-width, initial-scale=1");
  }
  
  function includes(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  }
  