module ApplicationHelper
  def my_website
    link_to 'Mohamed Adam Chaieb', 'https://moechaieb.github.io'
  end

  def scrape_calendar(github_username)
    calendar = []

    agent = Mechanize.new
    profile = agent.get "https://github.com/users/#{github_username}/contributions" rescue {}

    return calendar if profile.nil? || profile == {}
    return calendar unless profile.code.to_i == 200

    profile.search('g').map do |elem|
      return nil if elem.nil?

      elem.children.select {|c| c.name == 'rect'}.map {|s| s['data-count'].to_i}
    end.compact
  end
end
