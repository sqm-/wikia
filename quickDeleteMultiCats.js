/**
 * Quick Delete/multiCats - multipleCategories
 * Deletes all the pages in specified categories (default: Category:Candidates_for_deletion)
 * extension of http://dev.wikia.com/wiki/QuickDelete/code.js
 *
 * @author: [[w:User:Fubuki風吹]]
 */
 
(function ( $, mw ) {
    'use strict';
    var config = {
        server: mw.config.get( 'wgServer' ),
        skin: mw.config.get( 'skin' ),
        namespace: mw.config.get( 'wgCanonicalNamespace' ),
        title: mw.config.get( 'wgTitle' ),
        edittoken: mw.user.tokens.values.editToken,
        usergroups: mw.config.get( 'wgUserGroups' )
    };
    var translations = {
            // Keep the list in alphabetical order
            // Reminder: use backslash to escape quotes within strings
            // Catalan
            ca: {
                buttonTitle: 'Esborrar totes les pàgines en aquesta categoria',
                buttonText: 'Esborrar-ho tot',
                reasonHead: 'Motiu per a l’esborrat',
                reasonBody: 'Totes les pàgines, incloent fitxers en aquesta categoria seran esborrats amb el motiu de:',
                reasonAlert: 'Assegura’t de verificar si totes les pàgines i fitxers necessiten ser esborrats!',
                msgDel: 'Esborrar',
                msgCancel: 'Canceŀlar',
                msgRf: 'Actualitzar',
                doneHead: 'Esborrat',
                doneBody: 'Totes les pàgines i fitxers en aquesta categoria seran esborrats.',
                emptyHead: 'Cap element ha estat trobat',
                emptyBody: 'No existeixen pàgines o fitxers trobats en aquesta categoria.'
            },
            // English
            en: {
                buttonTitle: 'Delete all pages in this category',
                buttonText: 'Delete All',
                reasonHead: 'Reason for deletion',
                reasonBody: 'All pages including files in this category will be deleted with the reason being:',
                reasonAlert: 'Make sure to check if all the pages and files need to be deleted!',
                msgDel: 'Delete',
                msgCancel: 'Cancel',
                msgRf: 'Refresh',
                doneHead: 'Deleted',
                doneBody: 'All pages and files in this category have been deleted.',
                emptyHead: 'No items found',
                emptyBody: 'No pages or files found in this category.'
            },
            // Spanish
            es: {
                buttonTitle: 'Borrar todas las páginas en esta categoría',
                buttonText: 'Borrar Todo',
                reasonHead: 'Razón de borrado',
                reasonBody: 'Todas las páginas incluyendo archivos en esta categoría van a ser borradas con la razón dada:',
                reasonAlert: '¡Asegúrate de revisar si todas las páginas y archivos necesitan ser borrados!',
                msgDel: 'Borrar',
                msgCancel: 'Cancelar',
                msgRf: 'Recargar',
                doneHead: 'Borrado',
                doneBody: 'Todas las páginas y archivos en esta categoría han sido borrados.',
                emptyHead: 'No se encontraron elementos',
                emptyBody: 'No hay páginas o archivos en esta categoría.'
            },
            // Finnish
            fi: {
                buttonTitle: 'Poista kaikki tässä luokassa olevat sivut',
                buttonText: 'Poista kaikki',
                reasonHead: 'Poiston syy',
                reasonBody: 'Kaikki tämän luokan sivut tiedostot mukaan lukien poistetaan seuraavasta syystä:',
                reasonAlert: 'Varmistathan, että kaikki sivut ja tiedostot on poistettava!',
                msgDel: 'Poista',
                msgCancel: 'Peruuta',
                msgRf: 'Päivitä',
                doneHead: 'Poisto suoritettu',
                doneBody: 'Kaikki tässä luokassa olleet sivut on postettu.',
                emptyHead: 'Ei nimikkeitä',
                emptyBody: 'Tästä luokasta ei löytynyt yhtään sivua tai tiedostoa.'
            },
            // Galician
            gl: {
                buttonTitle: 'Excluír todas as páxinas nesta categoría',
                buttonText: 'Excluír todo',
                reasonHead: 'Motivo para exclusión',
                reasonBody: 'Todas as páxinas, incluíndo ficheiros nesta categoría serán excluídos polo motivo de:',
                reasonAlert: 'Asegúrache de verificar se todas as páxinas e ficheiros precisan ser excluídos!',
                msgDel: 'Excluír',
                msgCancel: 'Cancelar',
                msgRf: 'Actualizar',
                doneHead: 'Excluído',
                doneBody: 'Todas as páxinas e ficheiros nesta categoría foron excluídos.',
                emptyHead: 'Ningún elemento foi encontrado',
                emptyBody: 'Non existen páxinas ou ficheiros encontrados nesta categoría.'
            },
            // Italian
            it: {
                buttonTitle: 'Cancella tutte le pagine in questa categoria',
                buttonText: 'Cancella Tutto',
                reasonHead: 'Ragione per l\'eliminazione',
                reasonBody: 'Tutte le pagine in questa categoria verranno cancellate per la seguente ragione:',
                reasonAlert: 'Controlla se tutte le pagine e le immagini vanno cancellate!',
                msgDel: 'Cancella',
                msgCancel: 'Annulla',
                msgRf: 'Ricarica',
                doneHead: 'Cancellato',
                doneBody: 'Tutte le pagine in questa categoria sono state cancellate.',
                emptyHead: 'Non sono stati trovati elementi',
                emptyBody: 'Non sono state trovate pagine o immagini in questa categoria.'
            },
            // Malay
            ms: {
                buttonTitle: 'Padam semua halaman dalam kategori ini',
                buttonText: 'Padam Semua',
                reasonHead: 'Sebab memadam',
                reasonBody: 'Semua halaman termasuk fail-fail dalam kategori ini akan dipadamkan kerana:',
                reasonAlert: 'Sila pastikan semua halaman dan fail-fail sudah diperiksa dan memang ingin dipadam!',
                msgDel: 'Padam',
                msgCancel: 'Batal',
                msgRf: 'Muat semula',
                doneHead: 'Dipadamkan',
                doneBody: 'Semua halaman dan fail-fail dalam kategori ini telahpun dipadamkan.',
                emptyHead: 'Tiada kandungan',
                emptyBody: 'Tiada halaman atau fail terjumpa dalam kategori ini.'
            },
            // Dutch
            nl: {
                buttonTitle: 'Verwijder alle pagina\'s in deze categorie',
                buttonText: 'Verwijder alles',
                reasonHead: 'Reden om te verwijderen',
                reasonBody: 'Alle pagina\'s in deze categorie, inclusief bestanden, zullen verwijderd worden, met als reden:',
                reasonAlert: 'Let op of alle pagina\'s en bestanden wel zeker moeten verwijderd worden!',
                msgDel: 'Verwijderen',
                msgCancel: 'Annuleren',
                msgRf: 'Hernieuwen',
                doneHead: 'Verwijderd',
                doneBody: 'Alle pagina\'s en bestanden in deze categorie zijn verwijderd.',
                emptyHead: 'Geen items gevonden',
                emptyBody: 'Geen pagina\'s of bestanden gevonden in deze categorie.'
            },
            // Polish
            pl: {
                buttonTitle: 'Usuń wszystkie strony z tej kategorii',
                buttonText: 'Usuń wszystko',
                reasonHead: 'Powód usunięcia',
                reasonBody: 'Wszystkie strony wraz z plikami z tej kategorii zostaną usunięte z następującego powodu:',
                reasonAlert: 'Upewnij się, czy wszystkie strony i pliki mają zostać usunięte!',
                msgDel: 'Usuń',
                msgCancel: 'Anuluj',
                msgRf: 'Odśwież',
                doneHead: 'Usunięto',
                doneBody: 'Wszystkie strony i pliki z tej kategorii zostały usunięte.',
                emptyHead: 'Nic nie znaleziono',
                emptyBody: 'W tej kategorii nie ma stron lub plików.'
            },
            // Portuguese
            pt: {
                buttonTitle: 'Excluir todas as páginas nesta categoria',
                buttonText: 'Excluir tudo',
                reasonHead: 'Motivo para exclusão',
                reasonBody: 'Todas as páginas, incluindo ficheiros nesta categoria serão excluídos pelo motivo de:',
                reasonAlert: 'Assegura-te de verificar se todas as páginas e ficheiros precisam ser excluídos!',
                msgDel: 'Excluir',
                msgCancel: 'Cancelar',
                msgRf: 'Actualizar',
                doneHead: 'Excluído',
                doneBody: 'Todas as páginas e ficheiros nesta categoria foram excluídos.',
                emptyHead: 'Nenhum item foi encontrado',
                emptyBody: 'Não existem páginas ou ficheiros encontrados nesta categoria.'
            },
            // Portuguese (Brazilian)
            'pt-br': {
                buttonTitle: 'Excluir todas as páginas nesta categoria',
                buttonText: 'Expluir tudo',
                reasonHead: 'Motivo para exclusão',
                reasonBody: 'Todas as páginas, incluindo arquivos nesta categoria serão excluídos pelo motivo de:',
                reasonAlert: 'Certifique-se de verificar se todas as páginas e arquivos precisam ser excluídos!',
                msgDel: 'Excluir',
                msgCancel: 'Apagar',
                msgRf: 'Atualizar',
                doneHead: 'Excluído',
                doneBody: 'Todas as páginas e arquivos nesta categoria foram excluídos.',
                emptyHead: 'Nenhum item foi encontrado',
                emptyBody: 'Não existem páginas ou arquivos encontrados nesta categoria.'
            },
            // Swedish
            sv: {
                buttonTitle: 'Radera alla sidor i denna kategori',
                buttonText: 'Radera alla',
                reasonHead: 'Orsak till radering',
                reasonBody: 'Alla sidor inklusive filer raderas av följande orsak:',
                reasonAlert: 'Kontrollera att alla sidor och filer verkligen behöver raderas!',
                msgDel: 'Radera',
                msgCancel: 'Avbryt',
                msgRf: 'Uppdatera',
                doneHead: 'Raderingen utförd',
                doneBody: 'Alla sidor och filer i denna kategori har raderats.',
                emptyHead: 'Inga artiklar hittades',
                emptyBody: 'Inga sidor eller filer i denna kategori hittades.'
            },
            // Tagalog
            tl: {
                buttonTitle: 'Alisin ang lahat ng pahina sa kategorya',
                buttonText: 'Alisin ang lahat',
                reasonHead: 'Dahilan ng pag-alis',
                reasonBody: 'Lahat ng pahina kasama ang mga file na nasa kategoryang ito ay idedelete sa dahilang:',
                reasonAlert: 'Tiyakin na lahat ng pahina at file ay kailangang alisin!',
                msgDel: 'Alisin',
                msgCancel: 'Ikansela',
                msgRf: 'I-refresh',
                doneHead: 'Inalis na',
                doneBody: 'Inalis na ang lahat na pahina at file sa kategoryang ito.',
                emptyHead: 'Walang nahanap na mga file',
                emptyBody: 'Walang pahina o file ang nahanap sa kategoryang ito.'
            }
        },
        lang = $.extend( translations.en, translations[ mw.config.get( 'wgContentLanguage' ) ]);
    if ( $( '.deleteAll' ).length ) {
        return;
    }
    var categories = window.categories || [ 'Candidates for deletion' ];
    for ( i = 0; i < categories.length; i++ ) {
        if ( config.namespace == 'Category' && 
            config.title == categories[i] ) {
            if ( config.usergroups.indexOf('sysop') !== -1 || 
                config.usergroups.indexOf('bureaucrat') !== -1 ) {
                switch ( config.skin ) {
                case 'oasis':
                case 'wikia':
                    $( '.wikinav2 .WikiaPageHeader' ).css( 'padding-right', '0' );
                    var deleteAllButton = '<button class="wikia-button deleteAll" title="' + lang.buttonTitle + '">' + lang.buttonText + '</button>';
                    $( '#WikiaPageHeader .comments.talk' ).after( deleteAllButton );
                    $( '.deleteAll' ).on( 'click', checkDeletion ).css( 'margin', '3px 5px' );
                    break;
                case 'monobook':
                case 'uncyclopedia':
                case 'wowwiki':
                    $( '#p-cactions .pBody #ca-delete' ).after( '<li id="ca-deleteAll"><a id="ca-deleteAllButton" title="' + lang.buttonTitle + '">' + lang.buttonText + '</a></li>' );
                    $( '#ca-deleteAllButton' ).on( 'click', checkDeletion );
                }
            }
        }
    }
 
    function checkDeletion() {
        if ( config.skin == 'monobook' ) {
            mw.util.addCSS( '.modalWrapper {border:1px solid #aaa !important;box-shadow:5px 5px 35px #000;font-size:13px;padding:20px !important;}.modalWrapper .close {border:none;background:#aaa !important;padding:3px 5px !important;}.modalWrapper .neutral {margin-top:5px;}.modalWrapper .wikia-button {margin:3px;padding:2px 4px;background:#eee;color:#000;cursor:pointer;text-decoration:none;}' );
        }
        $.showCustomModal( lang.reasonHead, lang.reasonBody + ' <input style="border:1px solid #aaa;-moz-border-radius:4px;border-radius:4px;padding:2px;width:250px" type="text" id="wpDelReason"><hr>' + lang.reasonAlert, {
            id: 'deleteModal',
            width: 650,
            buttons: [ {
                defaultButton: true,
                message: lang.msgDel,
                handler: function () {
                    deleteAll();
                }
            }, {
                message: lang.msgCancel,
                handler: function () {
                    cancelDeletion();
                }
            } ]
        } );
    }
 
    function deleteAll() {
        cancelDeletion();
        var delItems = [];
        $( '#mw-pages .mw-content-ltr li' ).each( function () {
            delItems.push( $( this ).text() );
        } );
        $( '.gallery .gallrytext > a' ).each( function () {
            delItems.push( $( this ).attr( 'title' ).replace( / /g, '_' ) );
        } );
        config.reason = $( '#wpDelReason' ).val() || 'Marked for deletion';
        if ( delItems.length > 0 ) {
            for ( i = 0; i < delItems.length; i++ ) {
                var deleteURL = config.server + '/api.php?action=delete&title=' + encodeURIComponent( delItems[i] ) + '&token=' + encodeURIComponent( config.edittoken ) + '&reason=' + 
 
encodeURIComponent( reasons[i] );
                $.post( deleteURL );
            }
            $.showCustomModal( lang.doneHead, lang.doneBody, {
                id: 'deleted',
                width: 450,
                buttons: [ {
                    defaultButton: true,
                    id: 'refresh',
                    message: lang.msgRf,
                    handler: function () {
                        window.location.reload();
                    }
                } ]
            } );
        } else if ( delItems.length === 0 ) {
            $.showCustomModal( lang.emptyHead, lang.emptyBody, {
                id: 'no-delItems',
                width: 450,
                buttons: [ {
                    defaultButton: true,
                    message: 'OK',
                    handler: function () {
                        $( '#no-delItems' ).closeModal();
                    }
                } ]
            } );
        }
    }
 
    function cancelDeletion() {
        $( '#deleteModal' ).closeModal();
    }
} )  ( jQuery, mediaWiki );
