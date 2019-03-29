(function(){
'use strict';

describe('Category Controller', function() {
    var categoryResource,
        $controller,
        $q,
        $timeout;

    beforeEach(angular.mock.module('todo', function($provide){
        $provide.service('categoryResource', function($q) {
            categoryResource = {};

            categoryResource.getCategories = function getCategories() {
                return $q(function(fulfill, reject) {
                    fulfill([1, 2, 3, 4]);
                });
            };
            sinon.spy(categoryResource, 'getCategories');
            return categoryResource;
        });
    }));

    beforeEach(inject(function(_$controller_, _$timeout_, _$q_) {
        $timeout = _$timeout_;
        $q = _$q_;
        $controller = _$controller_('categoryCtrl');
    }));
  
    it('should get categories from a resource', function() {
        categoryResource.getCategories.called.should.equal(true);
        $timeout.flush(); // causes error - 'No deferred tasks to be flushed'
        $controller.categories.length.should.equal(43);
    });
});

}());