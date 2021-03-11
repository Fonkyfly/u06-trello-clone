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

        var state = true;
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

        $( "#doList, #doingList, #doneList" ).disableSelection();

        // Draggable & droppable
        // $('.todoListItem').draggable();

        // $('#doList').droppable(
        //     {
        //     accept: "#todoListItem",
        //     drop: function()
        //     {
        //         console.log("drop");
        //     }
        // }
        // )

        // $('#doingList').droppable(
        //     {
        //     accept: "#todoListItem",
        //     drop: function()
        //     {
        //         console.log("drop");
        //     }
        // }
        // )

        // $('#doneList').droppable(
        //     {
        //     accept: "#todoListItem",
        //     drop: function()
        //     {
        //         console.log("drop");
        //     }
        // }
        // )

        // Skapa en widget med jquery UI:s widget factory, ge widgeten ett namespace
        $.widget("color.party", {

            // Här definierar vi olika inställningar för widgeten
            options: {
                red: 200,
                green: 200,
                blue: 200,
                change: null,
                random: null
            },
            
            // Här definierar pluginens logik
            _create: function() {
                this.element.addClass("color-party");
                this.activator = $("<button>", {
                    text: "Party hard!",
                    "class": "color-party-activator"
                })

                .appendTo(this.element).button();

                this.on(this.activator, {
                    click: "activate"
                })

                this._refresh();
            },

            _refresh: function () {
                this.element.css("background-color", "rgb("+
                this.options.red + "." +
                this.options.green + "." +
                this.options.blue + ")"
                );
                this._trigger("change");
            },

            random: function(event) {
                var colors = {
                    red: Math.floor(Math.random()*256),
                    green: Math.floor(Math.random()*256),
                    blue: Math.floor(Math.random()*256)
                };
                
                if (this.trigger("random", event, colors) !== false) {
                    this.option(colors);
                }
            },

            destroy: function() {
                this.changer.remove();
                this.element.removeClass("custom-colorize").enableSelection().css("background-color", "transparent");
            },

            setOptions: function () {
                this.superApply(arguments);
                this._refresh();
                if (/red|green|blue/.test(key) && value < 0 || value > 255) {
                    return;
                }
                this.super(key, value);
                }
            });

        // INITIERA WIDGET, GÖR OM SÅ ATT DET BLIR PARTY VARJE SEKUND
        //$("#bodyEffect").



        // testkommentar
            
        //     // Här kan vi sätta konfiguration efter widgeten är initialiserad
        //     _setOption: function( key, value ) {},
            
        //     // Här säger vi till hur elementet vi kopplar vår widget på ska uppdateras
        //     _refresh: function() {},
            
        //     // Här kan vi säga till hur elementet som har widgeten applicerad på sig ska tas bort
        //     _destroy: function() {}
        // });
        
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


        
        // Opener definieras med klick
        $(".opener" ).on( "click", function () {
            // Välj rätt element utifrån vilken knapp som trycks
            $(`#${$(this).data("id")}`).dialog("open"); // dialog1, dialog2, ...
        });
    })
});