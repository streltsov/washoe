export const paperStyles = `
  .paper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto; 
    max-width: 75%;
    max-height: 75%;
    background-color: #f9f9fa;
    border: 2px solid #d7d7db;
    padding: 16px;
    overflow: auto;
    z-index: 99999999;
}
   .word {
     font-family: 'Playfair Display',serif;
}
   .meaning {
     font-family: 'Open Sans',Helvetica,Arial,sans-serif;
     font-size: 18px;
     font-stretch: normal;
     letter-spacing: .2px;
     line-height: 22px;
     padding-bottom: 16px;
}
   .example {
     font-style: italic;
}
:focus {outline:none;}
::-moz-focus-inner {border:0;}
`;
export const searchStyles = `
.search-container{position:fixed;top:48px;display:flex;justify-content:center;border:2px solid #d7d7db;width:100%;background-color:#f9f9fa;0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);padding:48px 0;border-radius:4px;z-index:9999999}.search-input{height:52px;width:440px;font-size:24px}`;
