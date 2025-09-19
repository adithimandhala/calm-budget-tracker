import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Users, Calendar, DollarSign, Plus, Target } from "lucide-react";
import { useState } from "react";

interface EmergencyGroup {
  id: string;
  name: string;
  members: string[];
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  timePeriod: string;
  purpose: string;
  createdBy: string;
}

const EmergencySavingsGroups = () => {
  const [groups, setGroups] = useState<EmergencyGroup[]>([
    {
      id: '1',
      name: 'Family Emergency Fund',
      members: ['You', 'Spouse', 'Parents'],
      targetAmount: 100000,
      currentAmount: 45000,
      monthlyContribution: 5000,
      timePeriod: '18 months',
      purpose: 'Medical emergencies and unexpected expenses',
      createdBy: 'You'
    },
    {
      id: '2',
      name: 'Vacation Fund',
      members: ['You', 'Friends'],
      targetAmount: 50000,
      currentAmount: 20000,
      monthlyContribution: 3000,
      timePeriod: '10 months',
      purpose: 'Annual family vacation',
      createdBy: 'You'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    targetAmount: '',
    monthlyContribution: '',
    timePeriod: '',
    purpose: ''
  });

  const createGroup = () => {
    if (!newGroup.name || !newGroup.targetAmount || !newGroup.monthlyContribution) return;
    
    const group: EmergencyGroup = {
      id: Date.now().toString(),
      name: newGroup.name,
      members: ['You'],
      targetAmount: parseInt(newGroup.targetAmount),
      currentAmount: 0,
      monthlyContribution: parseInt(newGroup.monthlyContribution),
      timePeriod: newGroup.timePeriod,
      purpose: newGroup.purpose,
      createdBy: 'You'
    };
    
    setGroups([...groups, group]);
    setNewGroup({ name: '', targetAmount: '', monthlyContribution: '', timePeriod: '', purpose: '' });
    setShowCreateForm(false);
  };

  const addContribution = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, currentAmount: group.currentAmount + group.monthlyContribution }
        : group
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-blue-600" />
            Emergency Savings Groups
          </h2>
          <p className="text-gray-600 mt-1">Create shared emergency funds with family and friends</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      {showCreateForm && (
        <Card className="border-blue-200 bg-blue-50 animate-slide-down">
          <CardHeader>
            <CardTitle className="text-blue-800">Create Emergency Savings Group</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  placeholder="e.g., Family Emergency Fund"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="targetAmount">Target Amount (₹)</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="100000"
                  value={newGroup.targetAmount}
                  onChange={(e) => setNewGroup({...newGroup, targetAmount: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="monthlyContribution">Monthly Contribution (₹)</Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  placeholder="5000"
                  value={newGroup.monthlyContribution}
                  onChange={(e) => setNewGroup({...newGroup, monthlyContribution: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="timePeriod">Time Period</Label>
                <Select value={newGroup.timePeriod} onValueChange={(value) => setNewGroup({...newGroup, timePeriod: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6 months">6 months</SelectItem>
                    <SelectItem value="12 months">12 months</SelectItem>
                    <SelectItem value="18 months">18 months</SelectItem>
                    <SelectItem value="24 months">24 months</SelectItem>
                    <SelectItem value="36 months">36 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="purpose">Purpose</Label>
              <Input
                id="purpose"
                placeholder="e.g., Medical emergencies, vacation fund"
                value={newGroup.purpose}
                onChange={(e) => setNewGroup({...newGroup, purpose: e.target.value})}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={createGroup} className="bg-blue-600 hover:bg-blue-700">
                Create Group
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {groups.map((group) => {
          const progress = (group.currentAmount / group.targetAmount) * 100;
          const monthsRemaining = Math.ceil((group.targetAmount - group.currentAmount) / group.monthlyContribution);
          
          return (
            <Card key={group.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {group.members.length} members
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{group.currentAmount.toLocaleString()}</span>
                    <span>₹{group.targetAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{monthsRemaining} months left</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span>₹{group.monthlyContribution.toLocaleString()}/month</span>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <strong>Purpose:</strong> {group.purpose}
                </div>

                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Members: {group.members.join(', ')}
                  </span>
                </div>

                <Button 
                  onClick={() => addContribution(group.id)}
                  className="w-full bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-200"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Add Monthly Contribution
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EmergencySavingsGroups;
