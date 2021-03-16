$(()=>{
    $(function () {
        // Skapa divar innehållande todo, doing, done
        $('#todo').append('<ul class="todoList droppable" id="doList"></ul>')
        $('#doing').append('<ul class="todoList droppable" id="doingList"></ul>')
        $('#done').append('<ul class="todoList droppable" id="doneList"></ul>')
        // Skapa mock-data
        for (var i = 0; i < 8; i++) {
            const myShinyNewDiv = 
            `<li class = "todoListItem" data-tabs="tabs${i}"> 
                <div class="tabs">
                    <ul>
                        <li><a href="#fragment-1"><span>Dialog</span></a></li>
                        <li><a href="#fragment-2"><span>Description</span></a></li>
                        <li><a href="#fragment-3"><span>Due</span></a></li>
                    </ul>
                    Detta är rubriken
                    <div id="fragment-3">
                        <p  data-date="datepicker${i}">Date: <input class="datepicker" type="text" id = "datepicker${i}">  
                        </p>
                    </div>
                    <div id="fragment-2">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    </div>
                    <div id="fragment-1">
                    <div class="todoItem" id="dialog${i}">
                    ${i}Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Numquam aliquam nostrum dignissimos non, sed voluptas nulla blanditiis 
                </div>
                <div>
                    <button type="button" class="opener" data-id="dialog${i}">
                        Show more
                    </button>
                </div>
                    </div>
                </div>

            </li>`;
            // Strössla i olika divvar
            if (i < 3) {
                $('#doList').append(myShinyNewDiv);
            }

            if (i < 5 && i > 2) {
                $('#doingList').append(myShinyNewDiv);
            }

            if (i > 4) {
                $('#doneList').append(myShinyNewDiv);
            }
            
        }
        // Definiera variabler till effekt och widget
        var partyToggle = false;
        var state = true;

        // Effekt
        $( "#effectButton" ).on( "click", function() {
            if (state) {
                $("#bodyEffect").animate({
                    backgroundColor: "#aa0000",
                    color: "#fff",
                    //width: 500
                }, 1000 );
            } else {
                $( "#bodyEffect" ).animate({
                backgroundColor: "#0769AD",
                color: "#000",
                //width: 240
                }, 1000 );
            }
            state = !state;
        });

        // Tabs sätts
        $( ".tabs" ).tabs();

        // Datepicker sätts
        $('.datepicker').datepicker();

        $('ul.droppable').sortable({
            connectWith: "ul.droppable",
        })

        // Gör det lättare att kunna flytta elementen eftersom texten inte kan markeras.
        $( "#doList, #doingList, #doneList" ).disableSelection();



        $.widget('custom.colorParty',{

            _create: function() {
                // Lägg till klass till objektet så färg kan ändras
                this.element
                    .addClass('colorParty')
                    // .text(colorList);

                // Skapa knapp som kan sätta igång partyt
                this.changer = $( "<button>", {
                    text: "Start the party",
                    "class": "custom-colorize-changer"
                    })
                    .appendTo(this.element)
                    .button();
                
                // När knappen trycks aktiveras eller återställs widgeten
                this.changer.on( "click", function () {
                        if (partyToggle == false) {
                            partyToggle = true;
                            $(".custom-colorize-changer").text("Turn the party OFF!");
                        } else {
                            partyToggle = false;
                            $(".colorParty").css("background-color", "rgb(138, 43, 226)"
                            );
                            $(".custom-colorize-changer").text("Turn the party ON!");
                        }
                        $(".colorParty").colorParty("refresh");
                    },
                  );
                  this.refresh();
                },

            // Slumpar fram nya bakgrundsfärger
            refresh: function() {
                if (partyToggle == true) {
                    var colors = {
                        red: Math.floor( Math.random() * 256 ),
                        green: Math.floor( Math.random() * 256 ),
                        blue: Math.floor( Math.random() * 256 )
                    }
                    $(".colorParty").css("background-color", "rgb("+
                    colors.red+", "+
                    colors.green+", "+
                    colors.blue+")"
                    );
                }
            },

            random: function(event) {
                var colors = {
                    red: Math.floor( Math.random() * 256 ),
                    green: Math.floor( Math.random() * 256 ),
                    blue: Math.floor( Math.random() * 256 )
                }
                this.options(colors);
            },

            _destroy: function() {
                this.changer.remove();
                this.element
                    .removeClass("colorParty")
                    .enableSelection()
                    .css("background-color", "transparent");
            },
        });

        $(document.body).colorParty();
                
        $('.todoItem').each(function () {
            // Options för dialogrutan
            var opt = {
                autoOpen: false,
                show: {
                    effect: "blind",
                    height: 600,
                    width: 600,
                    duration: 200
                },
                hide: {
                    effect: "blind",
                    duration: 200
                }
            };
            // Dialog skapas med ovan definierade options
            $(this).dialog(opt);
        })

        setInterval(function() {
            $(".colorParty").colorParty("refresh");
        }, 300);
        
        // Opener definieras med klick
        $(".opener" ).on( "click", function () {
            // Välj rätt element utifrån vilken knapp som trycks
            $(`#${$(this).data("id")}`).dialog("open"); // dialog1, dialog2, ...
        });
    })
});