$(document).ready(function() {
    var page = 1; // Initial page number
    var isLoading = false; // Flag to prevent multiple AJAX requests

    // Function to load more posts
    function loadMorePosts() {
        if (!isLoading) {
            isLoading = true;
            var url = 'https://jsonplaceholder.typicode.com/posts?_page=' + page + '&_limit=10';

            $.ajax({
                url: url,
                method: 'GET',
                success: function(data) {
                    if (data.length > 0) {
                        // Append posts to the container
                        data.forEach(function(post) {
                            var postHtml = '<div class="post"><h2>' + post.title + '</h2><p>' + post.body + '</p></div>';
                            $('#content-container').append(postHtml);
                        });
                        page++; // Increment page number for the next request
                        isLoading = false;
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error loading more posts:', error);
                    isLoading = false;
                }
            });
        }
    }

    // Trigger loadMorePosts when user scrolls to the bottom of the page
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            loadMorePosts();
        }
    });

    // Initial load of posts
    loadMorePosts();
});