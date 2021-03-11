$(()=>{

    $('#todo').append('<ul class="todoList" id="doList"></ul>')
    $('#doing').append('<ul class="todoList" id="doingList"></ul>')
    $('#done').append('<ul class="todoList" id="doneList"></ul>')

    for (var i = 0; i < 1; i++) {
        const textDivId = `textDivId${i}`;
        const dialogId = `dialogId${i}`;
        const showMoreId = `showMore${i}`;
        const myShinyNewDiv = 
        `<li>
            <div class="todoItem" id = dialog${i}>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Numquam aliquam nostrum dignissimos non, sed voluptas nulla blanditiis 
                </p>
                </div>
                <div>
                    <button type="button" id="showMore${i}">
                        Show more
                    </button>
                </div>
            </div>
        </li>`;
        if (i < 3) {
            $('#doList').append(myShinyNewDiv);
        }

        if (i < 5 && i > 2) {
            $('#doingList').append(myShinyNewDiv);
        }

        if (i > 4) {
            $('#doneList').append(myShinyNewDiv);
        }

        $(function() {
            $(`#dialogId${i}`).dialog({
              autoOpen: false,
              show: {
                effect: "blind",
                duration: 200
              },
              hide: {
                effect: "blind",
                duration: 200
              }
            });
         
            $(`#showMore${i}`).on( "click", function() {
              $(`#dialogId${i}`).dialog("open");
            //   $(this).parent().parent().first().append(htmlTest);
            });
        });

    }
