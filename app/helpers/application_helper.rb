module ApplicationHelper
  def my_website
    link_to 'Mohamed Adam Chaieb', 'http://moes.website'
  end

  def calendar_data
    calendar = JSON.parse(params.fetch('calendar', []).to_s)
    "<script> var data = #{calendar}; </script>".html_safe
  end

  def scrape_calendar(github_username)
    # TODO: implement this using mechanize
    []
  end
end
