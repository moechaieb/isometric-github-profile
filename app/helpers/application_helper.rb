module ApplicationHelper
  def my_website
    link_to 'Mohamed Adam Chaieb', 'http://moes.website'
  end

  def scrape_calendar(github_username)
    calendar = []

    agent = Mechanize.new
    profile = agent.get "https://github.com/users/#{github_username}/contributions" rescue {}
    
    return calendar if profile.nil?
    return calendar if profile == {}
    return calendar unless profile.code.to_i == 200
    
    profile.search('g').each_with_index do |elem, index|
      next if index == 0
      svgs = elem.children.select {|c| c.name == 'rect'}
      contributions = svgs.map {|s| s['data-count'].to_i}
      calendar[index] = contributions
    end

    calendar.compact
  end
end
