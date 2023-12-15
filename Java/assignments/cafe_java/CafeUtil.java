import java.util.ArrayList;

class CafeUtil {

        public int getStreakGoal() {
            int sum = 0;
            for (int i = 1; i < 11; i++) {
                sum += i;
            }
            return sum;
        }



        public double getOrderTotal(double[] prices) {
            double sum = 0;
            for (int i = 0; i < prices.length; i++) {
                sum += prices[i];
            }
            return sum;
        }



        public void displayMenu(ArrayList<String> menuItems) {
            for (int i = 0; i < menuItems.size(); i++) {
                System.out.println(i + " " + menuItems.get(i));
            }
        }



        public void addCustomer(ArrayList<String> customers) {
            System.out.println("Please enter your name.");
            String username = System.console().readLine();
            System.out.printf("Hello, %s! ", username);
            System.out.printf("There are %s people in front of you. \n", customers.size());
            customers.add(username); // to add an item to an ArrayList
            System.out.println(customers);
        }


}
