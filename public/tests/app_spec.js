describe(`LearnJS`, function() {
    it(`can show a problem view`, function(){
        learnjs.showView(`#problem-1`);
        expect($(`.view-container .problem-view`).length).toEqual(1);
    });

    it(`shows the landing page view when there is no hash`, function(){
        learnjs.showView(``);
        expect($(`.view-container .landing-view`).length).toEqual(1);
    });

    it('passes the hash view parameter to the view function', function(){
        spyOn(learnjs, 'problemView');
        learnjs.showView('#problem-42');
        expect(learnjs.problemView).toHaveBeenCalledWith('42');
    });

    describe('problem view', function(){
        it('has a title that includes the problem number', function(){
            var view = learnjs.problemView('1');
            expect(view.find('.title').text()).toEqual('Problem #1')
        });

        it('has a description that includes the problem number', function(){
            var view = learnjs.problemView('1');
            expect(view.find('.title').text()).toEqual('Problem #1')
            expect(view.find("[data-name='description']").text()).toEqual(learnjs.problems[0].description)
        });

        it('has a code that includes the problem number', function(){
            var view = learnjs.problemView('1');
            expect(view.find('.title').text()).toEqual('Problem #1')
            expect(view.find("[data-name='code']").text()).toEqual(learnjs.problems[0].code)
        });

        it('invokes the router when loaded', function() {
            spyOn(learnjs, 'showView');
            learnjs.appOnReady();
            expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
        });

        it('subscribes to the hash change event', function(){
            learnjs.appOnReady();
            spyOn(learnjs, 'showView');
            $(window).trigger('hashchange');
            expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
        });

        it('has a description by each problem number', function(){

        });
    })

    describe('answer section', function() {
        it('can check a correct answer by hitting a button', function() {
            var view = learnjs.problemView('1');

            view.find('.answer').val('true');
            view.find('.check-btn').click();
            expect(view.find('.result span').text()).toEqual('Correct!');
            expect(view.find('.result a').text()).toEqual('Next Problem');
        });

        it('rejects an in correct answer', function(){
            var view = learnjs.problemView('1');

            view.find('.answer').val('false');
            view.find('.check-btn').click();
            expect(view.find('.result').text()).toEqual('Incorrect!');

        });

        it('can check a correct answer by hitting a button on last problem', function() {
            var view = learnjs.problemView('2');

            view.find('.answer').val('7');
            view.find('.check-btn').click();
            expect(view.find('.result span').text()).toEqual('Correct!');
            expect(view.find('.result a').text()).toEqual("You're Finished");
        });
    });

});

